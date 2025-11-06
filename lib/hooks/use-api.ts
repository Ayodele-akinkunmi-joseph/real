"use client"

import { useState, useCallback } from "react"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useApi<T>(apiCall: (...args: any[]) => Promise<{ success: boolean; data: T }>) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, loading: true, error: null })
      try {
        const result = await apiCall(...args)
        if (result.success) {
          setState({ data: result.data, loading: false, error: null })
          return result.data
        } else {
          throw new Error("API call failed")
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error")
        setState({ data: null, loading: false, error: err })
        throw err
      }
    },
    [apiCall],
  )

  return { ...state, execute }
}
