import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@case-clinical/api/core/feature'
@Module({
  imports: [
    ApiCoreFeatureModule
  ],
})
export class AppModule {
}

