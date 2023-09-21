
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { FileVineService } from './file-vine.service';
@Module({
  imports: [HttpModule],
  providers: [
        FileVineService,
    ],
})
export class FileVineModule {}
