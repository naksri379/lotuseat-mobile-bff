import { HttpStatus } from '@nestjs/common'

enum CustomHttpStatus {
  INVALID_PARAMS = 400,
  INVALID_KEY = 401,
  DEPENDENCY_ERROR = 500,
}

export const ErrorStatus = {
  ...HttpStatus,
  ...CustomHttpStatus,
}

export type ErrorStatus = typeof ErrorStatus
