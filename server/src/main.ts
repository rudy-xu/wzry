import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DBService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dbService = new DBService();
  dbService.connectDB();

  await app.listen(3030);
}
bootstrap();
