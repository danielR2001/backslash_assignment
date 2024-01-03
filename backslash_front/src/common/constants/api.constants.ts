import { Environment } from './global.constants'

export const ServerUrls: { [key in Environment]: string } = {
  [Environment.Development]: 'http://localhost:8080',
  [Environment.Staging]: 'https://staging-something.com',
  [Environment.Production]: 'https://something.com'
}

enum PossibleAPIEndpoints {
  GET_GRAPH = 'GET_GRAPH'
}

export const APIEndpoints: { [key in PossibleAPIEndpoints]: string } = {
  //  Public
  [PossibleAPIEndpoints.GET_GRAPH]: '/graph'
}
