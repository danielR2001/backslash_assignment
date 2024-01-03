import {
  DefaultOptions,
  QueryClient,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { PromiseValue } from 'type-fest'

const queryConfig: DefaultOptions = {}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<ReturnType<FnType>>

export type QueryConfig<QueryFnType extends (...args: any) => any, MutationAxiosError> = UseQueryOptions<
  ExtractFnReturnType<QueryFnType>,
  AxiosError<MutationAxiosError, any>
>

export type MutationConfig<MutationFnType extends (...args: any) => any, MutationAxiosError> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError<MutationAxiosError, any>,
  Parameters<MutationFnType>[0]
>

export type InfiniteQueryConfig<
  QueryFnType extends (...args: any) => any,
  MutationAxiosError
> = UseInfiniteQueryOptions<ExtractFnReturnType<QueryFnType>, AxiosError<MutationAxiosError, any>>
