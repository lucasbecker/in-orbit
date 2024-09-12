import { CheckCircle2Icon, PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { Icon } from './icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'

export function Summary() {
  return (
    <section className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon />

          <span className="text-lg font-semibold">5 a 10 de Agosto</span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <PlusIcon className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </header>

      <div className="flex flex-col gap-3">
        <Progress max={15} value={8}>
          <ProgressIndicator />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">8</span> de{' '}
            <span className="text-zinc-100">15</span> metas nessa semana.
          </span>
          <span>50%</span>
        </div>
      </div>

      <Separator />

      <div className="flex gap-3 flex-wrap">
        <OutlineButton>
          <PlusIcon className="size-4 text-zinc-600" />
          Meditar
        </OutlineButton>

        <OutlineButton>
          <PlusIcon className="size-4 text-zinc-600" />
          Nadar
        </OutlineButton>

        <OutlineButton>
          <PlusIcon className="size-4 text-zinc-600" />
          Estudar
        </OutlineButton>

        <OutlineButton>
          <PlusIcon className="size-4 text-zinc-600" />
          Meditar
        </OutlineButton>

        <OutlineButton>
          <PlusIcon className="size-4 text-zinc-600" />
          Nadar
        </OutlineButton>

        <OutlineButton>
          <PlusIcon className="size-4 text-zinc-600" />
          Estudar
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Domingo{' '}
            <span className="text-zinc-400 text-xs">(10 de Agosto)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-pink-500" />
              <p className="text-sm text-zinc-400">
                Você completou{' '}
                <span className="text-zinc-100">"Acordar cedo"</span> às{' '}
                <span className="text-zinc-100">08:13h</span>
              </p>
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-pink-500" />
              <p className="text-sm text-zinc-400">
                Você completou{' '}
                <span className="text-zinc-100">"Acordar cedo"</span> às{' '}
                <span className="text-zinc-100">08:13h</span>
              </p>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Segunda{' '}
            <span className="text-zinc-400 text-xs">(11 de Agosto)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-pink-500" />
              <p className="text-sm text-zinc-400">
                Você completou{' '}
                <span className="text-zinc-100">"Acordar cedo"</span> às{' '}
                <span className="text-zinc-100">08:13h</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
