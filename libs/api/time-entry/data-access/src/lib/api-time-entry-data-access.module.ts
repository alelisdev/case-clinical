
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiTimeEntryDataAccessAdminService } from './api-time-entry-data-access-admin.service'
import { ApiTimeEntryDataAccessUserService } from './api-time-entry-data-access-user.service'
import { ApiTimeEntryDataAccessPublicService } from './api-time-entry-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiTimeEntryDataAccessAdminService, ApiTimeEntryDataAccessUserService, ApiTimeEntryDataAccessPublicService],
  exports: [ApiTimeEntryDataAccessAdminService, ApiTimeEntryDataAccessUserService, ApiTimeEntryDataAccessPublicService],
})
export class ApiTimeEntryDataAccessModule {}
