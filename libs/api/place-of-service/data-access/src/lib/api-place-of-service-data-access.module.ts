
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiPlaceOfServiceDataAccessAdminService } from './api-place-of-service-data-access-admin.service'
import { ApiPlaceOfServiceDataAccessUserService } from './api-place-of-service-data-access-user.service'
import { ApiPlaceOfServiceDataAccessPublicService } from './api-place-of-service-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiPlaceOfServiceDataAccessAdminService, ApiPlaceOfServiceDataAccessUserService, ApiPlaceOfServiceDataAccessPublicService],
  exports: [ApiPlaceOfServiceDataAccessAdminService, ApiPlaceOfServiceDataAccessUserService, ApiPlaceOfServiceDataAccessPublicService],
})
export class ApiPlaceOfServiceDataAccessModule {}
