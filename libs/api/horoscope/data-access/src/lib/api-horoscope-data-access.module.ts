import { HttpModule } from '@nestjs/axios'
import { ApiHoroscopeDataAccessPublicService } from './api-horoscope-data-access-public.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [HttpModule],
  providers: [ ApiHoroscopeDataAccessPublicService ],
  exports: [ ApiHoroscopeDataAccessPublicService ]
})
export class ApiHoroscopeDataAccessModule {}
