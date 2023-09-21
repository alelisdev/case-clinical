
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContractedRateInput,
  ApiContractedRateDataAccessPublicService,
  ContractedRate,
} from '@case-clinical/api/contracted-rate/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContractedRateFeaturePublicResolver {
  constructor(private readonly service: ApiContractedRateDataAccessPublicService) {}
           
  @Query(() => [ContractedRate], { nullable: true })
  publicContractedRates(
    @Args({ name: 'input', type: () => UserListContractedRateInput, nullable: true }) input?: UserListContractedRateInput,
  ) {
    return this.service.publicContractedRates(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContractedRates(
    @Args({ name: 'input', type: () => UserListContractedRateInput, nullable: true }) input?: UserListContractedRateInput,
  ) {
    return this.service.publicCountContractedRates(input)
  }

  @Query(() => [ContractedRate], { nullable: true })
  publicSelectContractedRates(
    @Args({ name: 'input', type: () => UserListContractedRateInput, nullable: true }) input?: UserListContractedRateInput,
  ) {
    return this.service.publicSelectContractedRates(input)
  }

  @Query(() => ContractedRate, { nullable: true })
  publicContractedRate(@Args('contractedRateId') contractedRateId: string) {
    return this.service.publicContractedRate(contractedRateId)
  }
}
