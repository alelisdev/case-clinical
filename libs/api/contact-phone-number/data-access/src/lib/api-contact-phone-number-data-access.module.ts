
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

import { ApiContactPhoneNumberDataAccessAdminService } from './api-contact-phone-number-data-access-admin.service'
import { ApiContactPhoneNumberDataAccessUserService } from './api-contact-phone-number-data-access-user.service'
import { ApiContactPhoneNumberDataAccessPublicService } from './api-contact-phone-number-data-access-public.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiContactPhoneNumberDataAccessAdminService, ApiContactPhoneNumberDataAccessUserService, ApiContactPhoneNumberDataAccessPublicService],
  exports: [ApiContactPhoneNumberDataAccessAdminService, ApiContactPhoneNumberDataAccessUserService, ApiContactPhoneNumberDataAccessPublicService],
})
export class ApiContactPhoneNumberDataAccessModule {}
