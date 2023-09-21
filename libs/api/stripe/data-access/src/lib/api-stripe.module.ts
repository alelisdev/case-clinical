import { Module } from '@nestjs/common'
import { ApiStripeService } from './api-stripe.service'
import { ApiCoreDataAccessModule } from '@case-clinical/api/core/data-access'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiStripeService ],
  exports: [ApiStripeService ]
})
export class ApiStripeModule {}
