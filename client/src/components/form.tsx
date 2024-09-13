import { Controller, useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { XIcon } from 'lucide-react'
import { z } from 'zod'

import { createGoal } from '../api/create-goal'

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

const frequencies = [
  { value: 1, label: '1x na semana', emoji: '🥱' },
  { value: 2, label: '2x na semana', emoji: '🙂' },
  { value: 3, label: '3x na semana', emoji: '😎' },
  { value: 4, label: '4x na semana', emoji: '😜' },
  { value: 5, label: '5x na semana', emoji: '🤨' },
  { value: 6, label: '6x na semana', emoji: '🤯' },
  { value: 7, label: 'Todos os dias da semana', emoji: '🔥' },
]

const createGoalSchema = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar.'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoal = z.infer<typeof createGoalSchema>

const INITIAL_DEFAULT_VALUES: CreateGoal = {
  title: '',
  desiredWeeklyFrequency: 1,
}

export function Form() {
  const queryClient = useQueryClient()

  const { control, formState, register, handleSubmit, reset } =
    useForm<CreateGoal>({
      defaultValues: INITIAL_DEFAULT_VALUES,
      resolver: zodResolver(createGoalSchema),
    })

  async function submit(data: CreateGoal) {
    await createGoal(data)

    queryClient.invalidateQueries({ queryKey: ['week-summary'] })
    queryClient.invalidateQueries({ queryKey: ['week-goals'] })

    reset(INITIAL_DEFAULT_VALUES)
  }

  return (
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

        <form
          action=""
          className="flex-1 flex flex-col justify-between"
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>

              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register('title')}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana?</Label>

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
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
                )}
              />

              {formState.errors.desiredWeeklyFrequency && (
                <p className="text-red-400 text-sm">
                  {formState.errors.desiredWeeklyFrequency.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button
                type="reset"
                variant="secondary"
                className="flex-1"
                onClick={() => reset(INITIAL_DEFAULT_VALUES)}
              >
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
  )
}
