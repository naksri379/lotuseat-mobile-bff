import * as jwt from 'jsonwebtoken'
import CustomError from 'src/utilities/customError'
import { UNAUTHORIZED } from 'src/constants/errorConstant'
import { ExecutionContext } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'
import { JwtExtractorGuard } from 'src/middleware/guards/jwtExtractor.guard'

jest.mock('jsonwebtoken')
jest.mock('src/utilities/logger')

describe('For jwtExtractor Guard canActivate medthod', () => {
  let jwtExtractorGuard: JwtExtractorGuard
  let decoded: any
  let decodedNoPayload: any
  const { decode } = jwt as jest.Mocked<typeof import('jsonwebtoken')>
  const mockContext = createMock<ExecutionContext>()

  beforeEach(() => {
    jwtExtractorGuard = new JwtExtractorGuard()
    mockContext.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization: 'providedToken',
      },
    })

    decoded = {
      header: {
        typ: 'JWT',
        alg: 'RS256',
        kid: '9twLUAvHtNOVEhTpcj-UhohMqomVHK6fc-4XvZYQ7TI',
      },
      payload: {
        exp: 1621243357,
        iat: 1621239757,
        jti: 'f80a7182-35d0-494d-bd0f-25263848fd52',
        iss: 'http://internal-new-customer-platform-dev-alb-685991238.ap-southeast-1.elb.amazonaws.com/auth/realms/identity',
        sub: '986103b0-120d-4739-a3f3-92133c987ec6',
        typ: 'Bearer',
        azp: 'oneapp-bff',
        session_state: '015bf66d-596e-4153-a3c7-220845cbcedf',
        acr: '1',
        scope: 'offline_access online loyalty',
        customer_uuid: 'encrypted_customer_uuid',
        surrogate_id: 'surrogateId',
      },
    }
    decodedNoPayload = {
      header: {
        typ: 'JWT',
        alg: 'RS256',
        kid: '9twLUAvHtNOVEhTpcj-UhohMqomVHK6fc-4XvZYQ7TI',
      },
    }
  })

  test('when request headers is not authorization field then return true', () => {
    const mockContext = createMock<ExecutionContext>()
    mockContext.switchToHttp().getRequest.mockReturnValue({
      headers: {},
    })
    const callCanActivate = jwtExtractorGuard.canActivate(mockContext)
    expect(callCanActivate).toEqual(true)
  })

  test('when request headers has authorization and valid then add customer_uuid to headers and context and return true', () => {
    decode.mockReturnValue(decoded)
    const callCanActivate = jwtExtractorGuard.canActivate(mockContext)
    expect(callCanActivate).toEqual(true)
  })

  test('when request headers has authorization and valid but not have customer_uuid then throw CusromError unauthorized', () => {
    decode.mockReturnValue(decodedNoPayload)
    try {
      jwtExtractorGuard.canActivate(mockContext)
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError)
      const customError = <CustomError>error
      expect(customError.statusCode).toBe(401)
      expect(customError.error).toBe(UNAUTHORIZED)
      expect(error.errorDescription).toBe('Cannot extract claims customer_uuid')
    }
  })

  test('when request headers has authorization and valid but decode response is null then throw CusromError unauthorized', () => {
    decode.mockReturnValue(null)

    try {
      jwtExtractorGuard.canActivate(mockContext)
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError)
      const customError = <CustomError>error
      expect(customError.statusCode).toBe(401)
      expect(customError.error).toBe(UNAUTHORIZED)
      expect(error.errorDescription).toBe('Authorization is invalid')
    }
  })
})
