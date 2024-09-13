import type { Goal } from '../types/goal'

type CreateGoal = { title: string; desiredWeeklyFrequency: number }

export async function createGoal(data: CreateGoal): Promise<Goal> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error('Fetch response is not ok!')

  return await response.json()
}
