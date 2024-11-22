import QueryClientProviderWrapper from './QueryClientProvider'

export default function Wrapper({ children }) {
    return (
        <>
            <QueryClientProviderWrapper>
                {children}
            </QueryClientProviderWrapper>
        </>
    )
}
