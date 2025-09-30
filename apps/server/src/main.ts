import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common'
import type { Observable } from 'rxjs'
import { Injectable, Logger, ValidationPipe } from '@nestjs/common'

import { NestFactory } from '@nestjs/core'
import chalk from 'chalk'
import { tap } from 'rxjs'
import { AppModule } from './app.module'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()

    const { method, url } = req
    const start = Date.now()

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start
        const statusCode = res.statusCode

        let color = chalk.white
        if (statusCode >= 500)
          color = chalk.redBright
        else if (statusCode >= 400)
          color = chalk.yellowBright
        else if (statusCode >= 300)
          color = chalk.cyanBright
        else if (statusCode >= 200)
          color = chalk.greenBright

        this.logger.log(
          `${chalk.magenta(method)} ${chalk.blue(url)} → ${color(
            statusCode,
          )} ${chalk.gray(`(${duration}ms)`)}`,
        )
      }),
    )
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // allow your client origin (adjust origin to client dev URL)
  app.enableCors({
    origin: 'http://localhost:5173', // change to your client dev port if different
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false, transform: true }))
  await app.listen(3000)
  console.log('Server listening on http://localhost:3000')
}
bootstrap()
