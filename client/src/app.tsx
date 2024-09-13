import { useQuery } from '@tanstack/react-query'

import { Dialog } from './components/ui/dialog'

import { Form } from './components/form'
import { Empty } from './components/empty'
import { Loading } from './components/loading'
import { Summary } from './components/summary'

import { getWeekSummary } from './api/get-week-summary'

export function App() {
  const { isLoading, data } = useQuery({
    queryKey: ['week-summary'],
    queryFn: getWeekSummary,
    staleTime: Number.POSITIVE_INFINITY,
  })

  return (
    <Dialog>
      {isLoading && !data && <Loading />}

      {!isLoading && !!data && data.total > 0 ? <Summary /> : <Empty />}

      <Form />
    </Dialog>
  )
}
