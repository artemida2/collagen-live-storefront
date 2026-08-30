import { PLACEHOLDER } from '../data/content'

const COLS: [string, string[]][] = [
  ['Каталог', ['Банки 0,5 кг', 'Сеты', 'Без вкуса с витамином C', 'Подарочные наборы']],
  ['О продукте', ['Почему живой', 'Технология Multiferment DDL', 'Состав', 'Как принимать']],
  ['Покупателю', ['Доставка и оплата', 'Возврат', 'Документы и сертификаты', 'Оптом и в розницу']],
]

export default function Footer({ onGo, onCart }: { onGo: (id: string) => void; onCart: () => void }) {
  return (
    <footer className="foot on-green" id="foot">
      <div className="foot__cta">
        <div className="shell foot__cta-in">
          <div>
            <h2 className="disp foot__cta-h">Соберите курс на полтора месяца</h2>
            <p className="prose">
              Шесть вкусов и сеты, цены производителя, отгрузка со склада по всей России. Бесплатная доставка
              при заказе от 8 000 ₽.
            </p>
          </div>
          <div className="foot__cta-acts">
            <button className="btn btn--solid btn--light" onClick={() => onGo('shop')}>
              <span>Выбрать вкус</span>
            </button>
            <button className="btn btn--ghost btn--light" onClick={onCart}>
              <span>Перейти в корзину</span>
            </button>
          </div>
        </div>
      </div>

      <div className="shell foot__in">
        <div className="foot__brand">
          <span className="foot__mark">Collagen Live</span>
          <span className="mono">официальный дистрибьютор</span>
          <p className="prose foot__about">
            Мы не производитель: продукт, состав и цены — Collagen Live. Мы держим склад, отгружаем заказы по
            России и отвечаем за доставку и поддержку.
          </p>
        </div>

        {COLS.map(([h, items]) => (
          <nav key={h} className="foot__col">
            <h3 className="mono foot__col-h">{h}</h3>
            <ul>
              {items.map((it) => (
                <li key={it}>
                  <button className="foot__link" onClick={() => onGo('shop')}>
                    {it}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="foot__col">
          <h3 className="mono foot__col-h">Контакты</h3>
          <ul className="foot__contacts">
            <li>
              <a className="foot__link" href={`tel:${PLACEHOLDER.phone.replace(/[^+\d]/g, '')}`}>
                {PLACEHOLDER.phone}
              </a>
            </li>
            <li>
              <a className="foot__link" href={`mailto:${PLACEHOLDER.email}`}>
                {PLACEHOLDER.email}
              </a>
            </li>
            <li className="mono">{PLACEHOLDER.address}</li>
            <li className="mono">{PLACEHOLDER.hours}</li>
          </ul>
        </div>
      </div>

      <div className="shell foot__legal">
        <p className="mono">
          ⚠ ЗАГЛУШКИ: {PLACEHOLDER.entity} · {PLACEHOLDER.inn} · {PLACEHOLDER.ogrn} · телефон, почта и адрес
          указаны условно и должны быть заменены реальными реквизитами дистрибьютора до запуска
        </p>
        <div className="foot__base mono">
          <span>Не является лекарственным средством. Имеются противопоказания, требуется консультация специалиста</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
