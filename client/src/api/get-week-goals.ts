import type { WeekGoal } from '../types/week-goal'

export async function getWeekGoals(): Promise<Array<WeekGoal>> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/week-goals`)

  if (!response.ok) throw new Error('Fetch response is not ok!')

  return await response.json()
}
