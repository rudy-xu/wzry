import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DBService } from './database/database.service';

async function bootstrap() {
  const dbService = new DBService();
  dbService.connectDB();
  dbService.createSchema();
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3030);
}
bootstrap();
