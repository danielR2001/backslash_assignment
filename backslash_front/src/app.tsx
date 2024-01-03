import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { Suspense, useMemo } from 'react'

import GraphPage from '@pages/graph_page'

import Router from './router'
import { theme } from './theme'

const App: React.FC = () => {
  const queryClient = useMemo(() => new QueryClient(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<GraphPage />}>
            <Router />
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}
export default App
