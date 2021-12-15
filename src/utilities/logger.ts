import CustomError from './customError'
import * as httpContext from 'express-http-context'
import { isExactObject } from './objectHelper'
import { CUSTOMER_ID, X_REQUEST_ID } from '../constants/httpContextConstant'

const LOGINFORMATION = '{LogInformation}'

class Log {
  generateLogTemplate(logInformation: any, level = 'INFO') {
    const utcDate = new Date().toISOString()
    const xRequestId: string =
      httpContext.get(X_REQUEST_ID) || 'InvalidBodyFormat'
    const xClientRequestId = ''
    const customerId: string = httpContext.get(CUSTOMER_ID) || ''
    const logTemplate = `${utcDate} | ${xRequestId} | ${xClientRequestId} | ${customerId} | ${level} | LOTUSSEAT-BFF ${LOGINFORMATION}`
    this.addLog(logTemplate, logInformation)
  }

  private addLog(logTemplate: string, logInformation: any) {
    let logMessage: any

    if (logInformation && isExactObject(logInformation)) {
      logMessage = JSON.parse(JSON.stringify(logInformation))
      this.logData(logTemplate, logMessage)
    } else {
      logMessage = logInformation
      this.logData(logTemplate, logMessage)
    }
  }

  private logData(logTemplate: string, logInformation: any) {
    let data = logInformation

    if (
      (typeof logInformation === 'object' &&
        !(logInformation instanceof Error)) ||
      logInformation instanceof CustomError
    ) {
      data = JSON.stringify(logInformation)
      if (logInformation instanceof CustomError) {
        data = data.replace(/\\n/g, '\n')
      }
    }

    const logData = logTemplate ? logTemplate.replace(LOGINFORMATION, data) : ''
    console.log(logData)
  }
}

export default Log
