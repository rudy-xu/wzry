import { Module } from "@nestjs/common";
import { DBService } from './database.service';

@Module({
  imports: [],
  providers: [DBService],
  // exports: [ DBService ]
})

export class DBModule {}