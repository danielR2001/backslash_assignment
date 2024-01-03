export namespace Api {
  export interface SuccessResponse<T = any> {
    status: {
      success: true
    }
    data: T
  }

  export type FailureResponse = {
    status: {
      success: false
      message: string
      invalidParams?: Record<string, string>
    }
  }

  export enum ErrorCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
  }
}
