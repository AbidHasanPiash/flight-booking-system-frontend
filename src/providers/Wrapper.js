import { AuthProvider } from '../context/AuthContext'
import QueryClientProviderWrapper from './QueryClientProvider'

export default function Wrapper({ children }) {
    return (
        <>
            <QueryClientProviderWrapper>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryClientProviderWrapper>
        </>
    )
}
