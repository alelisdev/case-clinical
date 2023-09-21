
import { Module } from '@nestjs/common'
import { ApiTenantDataAccessModule } from '@case-clinical/api/tenant/data-access'
import { ApiTenantFeatureAdminResolver } from './api-tenant-feature-admin.resolver'
import { ApiTenantFeaturePublicResolver } from './api-tenant-feature-public.resolver'
import { ApiTenantFeatureUserResolver } from './api-tenant-feature-user.resolver'

@Module({
  imports: [ApiTenantDataAccessModule],
  providers: [
        ApiTenantFeatureAdminResolver,
        ApiTenantFeaturePublicResolver,
        ApiTenantFeatureUserResolver
    ],
})
export class ApiTenantFeatureModule {}
