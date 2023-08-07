import { RETRY_COUNT } from '@/constants'

export const fetcher = async (url: string, options?: Record<string, never>) => {
  let count = RETRY_COUNT
  while (count > 0) {
    try {
      const response = await fetch(url, {
        ...options,
        mode: 'cors'
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }

    count -= 1
  }

  throw new Error(`Fetch call failed ${RETRY_COUNT} times`)
}
