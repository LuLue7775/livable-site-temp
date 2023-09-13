/**
 * Create a Request-scoped Instance of QueryClient
 * This will make prefetched queries available to all components further down the component tree,
 *  and allow us to fetch data within multiple Server Components and use <Hydrate> in multiple places.
 */
import { QueryClient } from '@tanstack/query-core'
import { cache } from 'react'

const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
