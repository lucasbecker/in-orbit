import { PlusIcon } from 'lucide-react'

import background from '../assets/background.svg'
import logo from '../assets/logo.svg'

import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'

export function Empty() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div>
        <h1 className="sr-only">in.orbit</h1>
        <img src={logo} alt="in.orbit" />
      </div>

      <img src={background} alt="Let's go!" />

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
        mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </section>
  )
}
