
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiLeadDataAccessAdminService } from './api-lead-data-access-admin.service'
import { ApiLeadDataAccessUserService } from './api-lead-data-access-user.service'
import { ApiLeadDataAccessPublicService } from './api-lead-data-access-public.service'
import { PharmacyService } from './pharmacy.service'

@Module({
  imports: [ApiCoreDataAccessModule, HttpModule],
  providers: [ApiLeadDataAccessAdminService, ApiLeadDataAccessUserService, ApiLeadDataAccessPublicService, PharmacyService],
  exports: [ApiLeadDataAccessAdminService, ApiLeadDataAccessUserService, ApiLeadDataAccessPublicService, PharmacyService],
})
export class ApiLeadDataAccessModule {}
