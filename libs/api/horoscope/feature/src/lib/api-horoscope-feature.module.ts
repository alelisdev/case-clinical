import { ApiHoroscopeDataAccessModule } from '@case-clinical/api/horoscope/data-access'
import { ApiHoroscopeFeaturePublicResolver } from './api-horoscope-feature-public.resolver'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    ApiHoroscopeDataAccessModule,
  ],
  providers: [
    ApiHoroscopeFeaturePublicResolver
  ]
})
export class ApiHoroscopeFeatureModule {}
