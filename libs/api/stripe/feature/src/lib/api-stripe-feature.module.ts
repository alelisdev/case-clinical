
import { Module } from '@nestjs/common'
import {ApiStripeModule} from '@case-clinical/api/stripe/data-access'

import { ApiStripeFeatureResolver } from './api-stripe-feature.resolver'

@Module({
  imports: [ApiStripeModule],
  providers: [
    ApiStripeFeatureResolver,
  ],
})
export class ApiStripeFeatureModule {}
