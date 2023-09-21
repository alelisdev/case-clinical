import { Module } from '@nestjs/common'
import { ApiFormLayoutFeatureUserResolver } from './api-form-layout-feature-user.resolver';
import { ApiFormLayoutDataAccessModule } from '@case-clinical/api/form-layout/data-access'
import { ApiFormLayoutFeaturePublicResolver } from './api-form-layout-feature-public.resolver';

@Module({
  imports: [
    ApiFormLayoutDataAccessModule
  ],
  providers: [
    ApiFormLayoutFeaturePublicResolver,
    ApiFormLayoutFeatureUserResolver
  ],
  exports: [],
})
export class ApiFormLayoutFeatureModule {}
