import { useQuery } from '@tanstack/react-query'

import { APIEndpoints } from '@constants/api.constants'
import { QueryKeys } from '@constants/query.constants'
import { Graph } from '@models/index'
import { Api } from '@my-types/api.types'
import { FilterBy } from '@my-types/general.types'

import { axios } from '../axios'
import { QueryConfig } from '../config'

type Response = Graph

const queryFn = async (filterBy?: FilterBy[]): Promise<Response> => {
  const response = await axios.get<Api.SuccessResponse<Response>>(APIEndpoints.GET_GRAPH, {
    params: {
      filterBy: JSON.stringify(filterBy)
    }
  })

  return response.data.data
}

type Config = QueryConfig<typeof queryFn, Api.FailureResponse> & {
  filterBy?: FilterBy[]
}

export const useGraph = (config: Config = {}) => {
  return useQuery({
    queryKey: QueryKeys.GRAPH,
    queryFn: () => queryFn(config.filterBy),
    ...config
  })
}
