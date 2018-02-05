import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3000, () => console.log('服务器已经启动:localhost:3000'));
}

bootstrap();

// http://localhost:3000/graphql
