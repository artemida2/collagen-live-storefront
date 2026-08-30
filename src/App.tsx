import { useScroll } from 'motion/react'
import { useCallback, useState } from 'react'
import Benefits from './components/Benefits'
import CartDrawer from './components/CartDrawer'
import Compare from './components/Compare'
import Composition from './components/Composition'
import Delivery from './components/Delivery'
import Film from './components/Film'
import Footer from './components/Footer'
import Grain from './components/Grain'
import Hero from './components/Hero'
import Plate from './components/Plate'
import Preloader from './components/Preloader'
import ProductModal from './components/ProductModal'
import Rail from './components/Rail'
import Ritual from './components/Ritual'
import Shop from './components/Shop'
import Tech from './components/Tech'
import type { Product } from './data/catalog'
import { scrollToId, useCart, useLenis, useReducedMotion } from './lib/hooks'

export default function App() {
  const reduced = useReducedMotion()
  const lenis = useLenis(!reduced)
  const { scrollYProgress } = useScroll()
  const cart = useCart()
  const [ready, setReady] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [shown, setShown] = useState<Product | null>(null)

  const onReady = useCallback(() => setReady(true), [])
  const go = useCallback((id: string) => scrollToId(id, lenis.current), [lenis])
  const inCart = useCallback((id: string) => cart.lines.some((l) => l.id === id), [cart.lines])
  const add = useCallback(
    (id: string) => {
      cart.add(id)
      setShown(null)
      setCartOpen(true)
    },
    [cart],
  )
  const openProduct = useCallback((p: Product) => {
    setCartOpen(false)
    setShown(p)
  }, [])

  return (
    <>
      <div className="site">
        <Film progress={scrollYProgress} reduced={reduced} onReady={onReady} />
        <Grain />
        <Rail count={cart.count} onGo={go} onCart={() => setCartOpen(true)} />

        <main>
          <Hero started={ready || reduced} onGo={go} />
          <Compare reduced={reduced} />
          <Tech reduced={reduced} />
          <Composition />
          <Benefits />
          <Plate />
          <Shop inCart={inCart} onAdd={add} onOpen={openProduct} />
          <Ritual />
          <Delivery />
        </main>

        <Footer onGo={go} onCart={() => setCartOpen(true)} />
      </div>

      <ProductModal
        product={shown}
        onClose={() => setShown(null)}
        onAdd={add}
        inCart={shown ? inCart(shown.id) : false}
      />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
      <Preloader ready={ready} reduced={reduced} />
    </>
  )
}
