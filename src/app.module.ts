import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { JwtExtractorGuard } from './middleware/guards/jwtExtractor.guard'
import { LoggerMiddleware } from './middleware/common/logger.middleware'
import { AccessMiddleware } from './middleware/common/access.middleware'
import modules from './modules'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [JwtExtractorGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })

    // consumer
    //   .apply(AccessMiddleware)
    //   .exclude({ path: '/actuator/health', method: RequestMethod.GET })
    //   .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
