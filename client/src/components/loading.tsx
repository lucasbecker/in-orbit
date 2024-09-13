import logo from '../assets/logo.svg'

export function Loading() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div>
        <h1 className="sr-only">in.orbit</h1>
        <img src={logo} alt="in.orbit" />
      </div>

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center text-xl">
        Carregando...
      </p>
    </section>
  )
}
