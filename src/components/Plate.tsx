/**
 * One full-bleed plate of the client's own photography, quiet and large,
 * placed as the breath before the catalogue. The named craft bar shows the
 * product at scale exactly once; everywhere else on this page the jar is
 * small, in a card or behind an aperture.
 */
export default function Plate() {
  return (
    <section className="plate" aria-label="Collagen Live Wellness">
      <figure className="plate__fig">
        <img
          src="/media/plate-wide.jpg"
          alt="Банки Collagen Live Wellness на кухонном столе с гранатом и апельсином"
          width={2400}
          height={1080}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="shell plate__cap">
        <span className="mono">Collagen Live Wellness · банка 0,5 кг</span>
        <span className="mono">Съёмка дистрибьютора</span>
      </div>
    </section>
  )
}
