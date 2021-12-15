import { PipeTransform, Injectable } from '@nestjs/common'
import { ObjectSchema } from 'joi'
import CustomError from 'src/utilities/customError'
const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
  abortEarly: false,
}

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value, options)
    if (error) {
      const errorDetail = error.details[0]
      const errorMessage = errorDetail.message
      throw CustomError.badRequest(errorMessage, errorDetail)
    }
    return value
  }
}
