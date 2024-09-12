import { XIcon } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './components/ui/dialog'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './components/ui/radio-group'
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'
import { Empty } from './components/empty'
import { Summary } from './components/summary'

const frequencies = [
  { value: 1, label: '1x na semana', emoji: '🥱' },
  { value: 2, label: '2x na semana', emoji: '🙂' },
  { value: 3, label: '3x na semana', emoji: '😎' },
  { value: 4, label: '4x na semana', emoji: '😜' },
  { value: 5, label: '5x na semana', emoji: '🤨' },
  { value: 6, label: '6x na semana', emoji: '🤯' },
  { value: 7, label: 'Todos os dias da semana', emoji: '🔥' },
]

export function App() {
  return (
    <Dialog>
      <Empty />

      {/* <Summary /> */}

      <DialogContent>
        <div className="h-full flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Cadastrar Meta</DialogTitle>

              <DialogClose>
                <XIcon className="size-5" />
              </DialogClose>
            </div>

            <DialogDescription>
              Adicione atividades que te fazem bem e que você quer continuar
              praticando toda semana.
            </DialogDescription>
          </div>

          <form action="" className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Qual a atividade?</Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder="Praticar exercícios, meditar, etc..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Quantas vezes na semana?</Label>

                <RadioGroup>
                  {frequencies.map(({ value, label, emoji }) => (
                    <RadioGroupItem
                      key={`frequency_${value}`}
                      value={value.toString()}
                    >
                      <RadioGroupIndicator />
                      <span className="text-zinc-300 text-sm font-medium leading-none">
                        {label}
                      </span>

                      <span className="text-lg leading-none">{emoji}</span>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button type="reset" variant="secondary" className="flex-1">
                  Fechar
                </Button>
              </DialogClose>

              <Button type="submit" className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
