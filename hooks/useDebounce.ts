import React, {useState, useEffect} from 'react'

export const useDebounce = (val: any, delay: any) => {
    const [debounceVal, setDebounceVal] = useState(val)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(val)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [val])

  return debounceVal
}
