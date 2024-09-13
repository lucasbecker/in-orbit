import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'

import { createGoalCompletion } from '../api/create-goal-completion'
import { getWeekGoals } from '../api/get-week-goals'

import { OutlineButton } from './ui/outline-button'

export function Goals() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['week-goals'],
    queryFn: getWeekGoals,
    staleTime: Number.POSITIVE_INFINITY,
  })

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['week-summary'] })
    queryClient.invalidateQueries({ queryKey: ['week-goals'] })
  }

  if (!data) return null

  return (
    <div className="flex gap-3 flex-wrap">
      {data.map(goal => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
          onClick={() => handleCompleteGoal(goal.id)}
        >
          <PlusIcon className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
