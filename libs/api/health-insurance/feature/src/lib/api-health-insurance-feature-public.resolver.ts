
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListHealthInsuranceInput,
  ApiHealthInsuranceDataAccessPublicService,
  HealthInsurance,
} from '@case-clinical/api/health-insurance/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiHealthInsuranceFeaturePublicResolver {
  constructor(private readonly service: ApiHealthInsuranceDataAccessPublicService) {}
           
  @Query(() => [HealthInsurance], { nullable: true })
  publicHealthInsurances(
    @Args({ name: 'input', type: () => UserListHealthInsuranceInput, nullable: true }) input?: UserListHealthInsuranceInput,
  ) {
    return this.service.publicHealthInsurances(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountHealthInsurances(
    @Args({ name: 'input', type: () => UserListHealthInsuranceInput, nullable: true }) input?: UserListHealthInsuranceInput,
  ) {
    return this.service.publicCountHealthInsurances(input)
  }

  @Query(() => [HealthInsurance], { nullable: true })
  publicSelectHealthInsurances(
    @Args({ name: 'input', type: () => UserListHealthInsuranceInput, nullable: true }) input?: UserListHealthInsuranceInput,
  ) {
    return this.service.publicSelectHealthInsurances(input)
  }

  @Query(() => HealthInsurance, { nullable: true })
  publicHealthInsurance(@Args('healthInsuranceId') healthInsuranceId: string) {
    return this.service.publicHealthInsurance(healthInsuranceId)
  }
}
