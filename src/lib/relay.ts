import { FREE_DELIVERY_FROM, rub } from '../data/catalog'
import type { CartApi } from './hooks'

/**
 * The order goes to form-relay, an Express receiver on the distributor's own
 * VPS, which prints every key of the body as one line of an e-mail and one
 * line of a Telegram message. That is the whole contract, and it dictates the
 * shape below: a flat object with human-readable Russian keys, in the order a
 * manager wants to read them — who to call first, what they ordered second.
 *
 * The receiver only checks origin, site id, the honeypot and a rate limit. It
 * validates nothing, so everything that must be filled in is enforced here.
 */
const RELAY_URL = 'https://hooks.neirolanding.ru/api/submit/collagen'

/** 20 requests per IP per 10 minutes, and the receiver can be slow to answer. */
const TIMEOUT_MS = 35_000

export type OrderForm = {
  name: string
  phone: string
  city: string
  comment: string
}

export function buildPayload(form: OrderForm, cart: CartApi, hp: string) {
  const left = Math.max(0, FREE_DELIVERY_FROM - cart.total)

  /* Insertion order is the order of lines in the letter. */
  const body: Record<string, string> = {
    'Имя': form.name.trim(),
    'Телефон': form.phone.trim(),
    'Город': form.city.trim(),
  }

  /* One key per position: a cart squashed into a single value would arrive as
     one unreadable line, and a nested array would print as [object Object]. */
  cart.items.forEach(({ qty, product }, i) => {
    body[`Позиция ${i + 1}`] =
      `${product.name}, ${product.weight} — ${qty} шт × ${rub(product.price)} = ${rub(product.price * qty)}`
  })

  body['Итого'] = rub(cart.total)
  body['Доставка'] =
    left > 0
      ? `рассчитает менеджер (до бесплатной не хватает ${rub(left)})`
      : `бесплатно (заказ от ${rub(FREE_DELIVERY_FROM)})`

  /* Consent is worthless if it cannot be shown later; the receiver stamps the
     time itself, so only the fact is recorded here. */
  body['Согласие с офертой и политикой ПДн'] = 'принято'
  body['Сайт'] = 'Collagen Live · Крым'

  if (form.comment.trim()) body['Комментарий'] = form.comment.trim()
  if (document.referrer) body['Источник перехода'] = document.referrer

  body['_hp'] = hp

  return body
}

export type SendResult = { ok: true } | { ok: false; message: string }

const FAILED = 'Не удалось отправить заявку. Позвоните нам — примем заказ по телефону:'

export async function sendOrder(form: OrderForm, cart: CartApi, hp: string): Promise<SendResult> {
  try {
    const res = await fetch(RELAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(form, cart, hp)),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}))

    /* The receiver can answer 200 with ok:false — when every delivery channel
       failed, the order is only written to its log. Both conditions or it is
       not a success. */
    if (!res.ok || data.ok !== true) {
      if (data.error === 'too_many_requests') {
        return {
          ok: false,
          message: 'Слишком много заявок с вашего адреса. Попробуйте через 10 минут или позвоните:',
        }
      }
      return { ok: false, message: FAILED }
    }

    return { ok: true }
  } catch {
    /* Network failure or the 35-second timeout. No automatic retry: it would
       burn the rate limit and lock a real person out. */
    return { ok: false, message: FAILED }
  }
}
