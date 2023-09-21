import { ApiCoreUtilService } from '@case-clinical/api/core/util'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import {inngest, ApplyForPchCoverageFunction} from './app/inngest'
import { AppModule } from './app/app.module'
import { LegalCase } from '@case-clinical/api/legal-case/data-access'
import { User } from '@case-clinical/api/user/data-access'
import { Inngest } from 'inngest'
import { serve } from 'inngest/express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))
  const config = app.get(ApiCoreUtilService)
  const globalPrefix = 'api'

  app.use(bodyParser.json({ limit: '250mb' }))
  app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }))
  app.use(setDefaultHeaderMiddleware)

  app.use(
    // Expose the middleware on our recommended path at `/api/inngest`.
    "/api/inngest",
    serve(inngest, [ApplyForPchCoverageFunction])
  );

  app.setGlobalPrefix(globalPrefix)

  app.enableCors({
    credentials: true,
    origin: config.apiCorsOrigins,
  })

  function setDefaultHeaderMiddleware(req, res, next) {
    if (req.method === 'GET') {
      req.headers.accept = 'text/html'
    }
    next()
  }

  app.use(cookieParser())
  const port = 3000
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
    Logger.log('Listening at http://localhost:' + port + '/graphql')
  })
}

bootstrap()

