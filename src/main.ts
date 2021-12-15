import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { json } from 'express'
import { AppModule } from './app.module'
import * as helmet from 'helmet'
import * as compression from 'compression'
import { TransformInterceptor } from './middleware/interceptor/transform.interceptor'
import {
  RuntimeExceptionsFilter,
  CustomErrorExceptionsFilter,
} from './middleware/filters/exceptionHandler.filter'

import * as httpContext from 'express-http-context'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(httpContext.middleware)
  app.use(json())
  app.use(compression())
  app.use(helmet())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(
    new RuntimeExceptionsFilter(),
    new CustomErrorExceptionsFilter()
  )
  app.enableCors()

  if (['local', 'dev', 'qa', 'ppe'].includes(process.env?.DEPLOY_ENV)) {
    const basePath =
      process.env.DOMAINNAME && !process.env.DOMAINNAME.includes('localhost')
        ? '/lotusseat-mobile-bff'
        : ''
    const options = new DocumentBuilder()
      .addSecurity('bearer', {
        type: 'http',
        scheme: 'bearer',
      })
      .addBearerAuth()
      .setTitle(`Lotus's eat swagger api documents`)
      .setDescription('The documents APIs')
      .setVersion('1.0')
      .addTag('api')
      .addServer(basePath)
      .build()
    const document = SwaggerModule.createDocument(app, options, {
      ignoreGlobalPrefix: true,
    })
    SwaggerModule.setup('swagger-ui', app, document)
  }
  app.listen(process.env.PORT || 4000)
}
bootstrap()
