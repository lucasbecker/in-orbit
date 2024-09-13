import { CheckCircle2Icon, PlusIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import ptBR from 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

import { getWeekSummary } from '../api/get-week-summary'

import { Progress, ProgressIndicator } from './ui/progress-bar'
import { DialogTrigger } from './ui/dialog'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Goals } from './goals'
import { Icon } from './icon'

dayjs.locale(ptBR)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['week-summary'],
    queryFn: getWeekSummary,
    staleTime: Number.POSITIVE_INFINITY,
  })

  if (!data) return null

  const firstDayOfWeek = dayjs().startOf('week').format('D MMMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMMM')

  const completedPercentage = Math.round((data.completed * 100) / data?.total)

  return (
    <section className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon />

          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <PlusIcon className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </header>

      <div className="flex flex-col gap-3">
        <Progress max={data.total} value={data.completed}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data.completed ?? 0}</span> de{' '}
            <span className="text-zinc-100">{data.total ?? 0}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <Goals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const formatDate = dayjs(date).format('D [de] MMMM')

          return (
            <div className="flex flex-col gap-4" key={date}>
              <h3 className="font-medium capitalize">
                {weekDay}{' '}
                <span className="text-zinc-400 text-xs normal-case">
                  ({formatDate})
                </span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map(goal => {
                  const hour = dayjs(goal.completedAt).format('HH:mm[h]')

                  return (
                    <li className="flex items-center gap-2" key={goal.id}>
                      <CheckCircle2Icon className="size-4 text-pink-500" />
                      <p className="text-sm text-zinc-400">
                        Você completou{' '}
                        <span className="text-zinc-100">"{goal.title}"</span> às{' '}
                        <span className="text-zinc-100">{hour}</span>
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
