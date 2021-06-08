import { useState } from 'react'

export default function useLoading() {

    const [isLoading, setIsLoading] = useState(true);

    return [
        isLoading,
        () => setIsLoading(true),
        () => setIsLoading(false),
    ]
}
