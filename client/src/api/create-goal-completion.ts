import type { GoalCompletion } from '../types/goal-completion'

export async function createGoalCompletion(
  goalId: string
): Promise<GoalCompletion> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goalId }),
  })

  if (!response.ok) throw new Error('Fetch response is not ok!')

  return await response.json()
}
