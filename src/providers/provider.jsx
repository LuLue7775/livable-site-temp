'use client'
/**
 * Create client side QueryClient
 */
import { QueryClient, QueryCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { useState } from 'react'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { GlassProvider } from './glassElementContext'
import { MenuProvider } from './menuContext'
import { CartProvider } from './cartContext'

function Providers({ children }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        },
      },
      queryCache: new QueryCache({
        onError: (error) => {
          console.error(`Something went wrong: ${error.message}`)
        },
      }),
    }),
  )

  const persister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  })

  return (
    <PersistQueryClientProvider client={client} persistOptions={{ persister }}>
      <ReactQueryStreamedHydration>
        <GlassProvider>
          <MenuProvider>
            <CartProvider>{children}</CartProvider>
          </MenuProvider>
        </GlassProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  )
}

export default Providers
