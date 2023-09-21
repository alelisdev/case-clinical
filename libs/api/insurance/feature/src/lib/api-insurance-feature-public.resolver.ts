
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListInsuranceInput,
  ApiInsuranceDataAccessPublicService,
  Insurance,
} from '@case-clinical/api/insurance/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiInsuranceFeaturePublicResolver {
  constructor(private readonly service: ApiInsuranceDataAccessPublicService) {}
           
  @Query(() => [Insurance], { nullable: true })
  publicInsurances(
    @Args({ name: 'input', type: () => UserListInsuranceInput, nullable: true }) input?: UserListInsuranceInput,
  ) {
    return this.service.publicInsurances(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountInsurances(
    @Args({ name: 'input', type: () => UserListInsuranceInput, nullable: true }) input?: UserListInsuranceInput,
  ) {
    return this.service.publicCountInsurances(input)
  }

  @Query(() => [Insurance], { nullable: true })
  publicSelectInsurances(
    @Args({ name: 'input', type: () => UserListInsuranceInput, nullable: true }) input?: UserListInsuranceInput,
  ) {
    return this.service.publicSelectInsurances(input)
  }

  @Query(() => Insurance, { nullable: true })
  publicInsurance(@Args('insuranceId') insuranceId: string) {
    return this.service.publicInsurance(insuranceId)
  }
}
