import { COMPANY, DOCS } from '../data/legal'

const CATALOGUE = ['Банки 0,5 кг', 'Сеты из трёх банок', 'Без вкуса с витамином C']

/**
 * Real addresses, not scroll targets. These pages are built separately from
 * content the distributor writes at /admin, and the footer is the only place
 * the landing links to them — without it a crawler reaches them through the
 * sitemap alone, which is the weakest signal there is.
 */
const PAGES: [string, string][] = [
  ['Доставка по Крыму', '/dostavka/'],
  ['Порошок или желе', '/razbor/poroshok-ili-zhele/'],
  ['Как хранить летом', '/kak/kak-hranit-letom/'],
  ['Цены', '/ceny/price/'],
]

export default function Footer({
  onGo,
  onCart,
  onDoc,
}: {
  onGo: (id: string) => void
  onCart: () => void
  onDoc: (id: string) => void
}) {
  return (
    <footer className="foot on-green" id="foot">
      <div className="foot__cta">
        <div className="shell foot__cta-in">
          <div>
            <h2 className="disp foot__cta-h">Соберите курс на полтора месяца</h2>
            <p className="prose">
              Пять вкусов и сеты, цена дистрибьютора, отгрузка со склада в Крыму. Бесплатная доставка по
              полуострову при заказе от 5 400 ₽.
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
          <span className="mono">{COMPANY.role}</span>
          <p className="prose foot__about">
            Мы не производитель: продукт и состав — Collagen Live. Мы держим склад в Крыму, отгружаем заказы по
            полуострову и отвечаем за доставку и поддержку.
          </p>
        </div>

        <nav className="foot__col">
          <h3 className="mono foot__col-h">Каталог</h3>
          <ul>
            {CATALOGUE.map((it) => (
              <li key={it}>
                <button className="foot__link" onClick={() => onGo('shop')}>
                  {it}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="foot__col">
          <h3 className="mono foot__col-h">Справочная</h3>
          <ul>
            {PAGES.map(([title, href]) => (
              <li key={href}>
                <a className="foot__link" href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="foot__col">
          <h3 className="mono foot__col-h">Документы</h3>
          <ul>
            {DOCS.map((d) => (
              <li key={d.id}>
                <button className="foot__link" onClick={() => onDoc(d.id)}>
                  {d.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot__col">
          <h3 className="mono foot__col-h">Контакты</h3>
          <ul className="foot__contacts">
            <li>
              <a className="foot__link" href={`tel:${COMPANY.phoneHref}`}>
                {COMPANY.phone}
              </a>
            </li>
            <li className="mono">Доставка по Крыму и Севастополю</li>
            <li className="mono">{COMPANY.hours}</li>
          </ul>
        </div>
      </div>

      <div className="shell foot__legal">
        <p className="mono foot__req">
          {COMPANY.entity} · ИНН {COMPANY.inn} · ОГРНИП {COMPANY.ogrnip} · {COMPANY.role} Collagen Live
        </p>
        <div className="foot__base mono">
          <span>
            Не является лекарственным средством. Имеются противопоказания, требуется консультация специалиста
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
