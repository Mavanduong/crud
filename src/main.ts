import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { error } from 'console'
import { LoggingInterceptor } from './share/interceptor/logging.interceptor'
import { TransformInterceptor } from './share/interceptor/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // thêm vào để loại bỏ các field không được khai báo decorator trong DTO

      forbidNonWhitelisted: true, //nếu có field không được khai báo decorator trong DTO mà client truyền lên thì sẽ báo lỗi

      transform: true, // tự động chuyển đổi dữ liệu sang kiểu khai báo trong DTO

      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (ValidationError) => {
        return new UnprocessableEntityException(
          ValidationError.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints as any).join(', '),
          })),
        )
      },
    }),
  )

  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000)
}
bootstrap()
