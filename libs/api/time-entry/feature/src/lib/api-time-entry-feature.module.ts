
import { Module } from '@nestjs/common'
import { ApiTimeEntryDataAccessModule } from '@case-clinical/api/time-entry/data-access'

import { ApiTimeEntryFeatureAdminResolver } from './api-time-entry-feature-admin.resolver'
import { ApiTimeEntryFeaturePublicResolver } from './api-time-entry-feature-public.resolver'
import { ApiTimeEntryFeatureUserResolver } from './api-time-entry-feature-user.resolver'

@Module({
  imports: [ApiTimeEntryDataAccessModule],
  providers: [
        ApiTimeEntryFeatureAdminResolver,
        ApiTimeEntryFeaturePublicResolver,
        ApiTimeEntryFeatureUserResolver
    ],
})
export class ApiTimeEntryFeatureModule {}
