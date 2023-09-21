
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiShortcutDataAccessAdminService } from './api-shortcut-data-access-admin.service'
import { ApiShortcutDataAccessUserService } from './api-shortcut-data-access-user.service'
import { ApiShortcutDataAccessPublicService } from './api-shortcut-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiShortcutDataAccessAdminService, ApiShortcutDataAccessUserService, ApiShortcutDataAccessPublicService],
  exports: [ApiShortcutDataAccessAdminService, ApiShortcutDataAccessUserService, ApiShortcutDataAccessPublicService],
})
export class ApiShortcutDataAccessModule {}
