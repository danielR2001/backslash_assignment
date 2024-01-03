export enum InvalidParamsMessage {
  INVALID_QUERY_PARAMS = 'invalid_query_params',
  INVALID_PARAMS = 'invalid_params'
}

export enum ErrorMessage {
  NOT_FOUND_ERROR = 'not_found',
  INTERNAL_ERROR = 'internal_error',
  UNAUTHORIZED = 'unauthorized'
}

export interface APIResponse {
  status: { success: boolean; message?: ErrorMessage; invalidParams?: Record<string, InvalidParamsMessage | string> }
  data?: any
}

export const successResponse = (data?: any): APIResponse => {
  return { status: { success: true }, data }
}
export const failureResponse = (
  message: ErrorMessage,
  invalidParams?: Record<string, InvalidParamsMessage | string>
): APIResponse => {
  return { status: { success: false, message, invalidParams } }
}
