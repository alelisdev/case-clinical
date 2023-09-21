
import { Module } from '@nestjs/common'
import { ApiContactPhoneNumberDataAccessModule } from '@case-clinical/api/contact-phone-number/data-access'

import { ApiContactPhoneNumberFeatureAdminResolver } from './api-contact-phone-number-feature-admin.resolver'
import { ApiContactPhoneNumberFeaturePublicResolver } from './api-contact-phone-number-feature-public.resolver'
import { ApiContactPhoneNumberFeatureUserResolver } from './api-contact-phone-number-feature-user.resolver'

@Module({
  imports: [ApiContactPhoneNumberDataAccessModule],
  providers: [
        ApiContactPhoneNumberFeatureAdminResolver,
        ApiContactPhoneNumberFeaturePublicResolver,
        ApiContactPhoneNumberFeatureUserResolver
    ],
})
export class ApiContactPhoneNumberFeatureModule {}
