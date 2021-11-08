import { Observable } from 'react-use/lib/useObservable'
import { useState, useEffect } from 'react'

function useObservable<T>(
  observable$: Observable<T>,
  initialValue?: T
): T | undefined {
  const [value, update] = useState<T | undefined>(initialValue)

  useEffect(() => {
    if (observable$) {
      const s = observable$.subscribe(update)
      return () => s.unsubscribe()
    }
  }, [observable$])

  return value
}

export default useObservable
