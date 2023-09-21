import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'
import { ApiTenantDataAccessAdminService } from './api-tenant-data-access-admin.service'
import { ApiTenantDataAccessUserService } from './api-tenant-data-access-user.service'
import { ApiTenantDataAccessPublicService } from './api-tenant-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTenantDataAccessAdminService, ApiTenantDataAccessUserService, ApiTenantDataAccessPublicService],
  exports: [ApiTenantDataAccessAdminService, ApiTenantDataAccessUserService, ApiTenantDataAccessPublicService],
})
export class ApiTenantDataAccessModule {}
