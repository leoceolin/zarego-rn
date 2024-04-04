import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StatusBar } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import Routes from './src/routes'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </QueryClientProvider>
  )
}
