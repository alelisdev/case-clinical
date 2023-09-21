
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContractedRateKindInput,
  ApiContractedRateKindDataAccessPublicService,
  ContractedRateKind,
} from '@case-clinical/api/contracted-rate-kind/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContractedRateKindFeaturePublicResolver {
  constructor(private readonly service: ApiContractedRateKindDataAccessPublicService) {}
           
  @Query(() => [ContractedRateKind], { nullable: true })
  publicContractedRateKinds(
    @Args({ name: 'input', type: () => UserListContractedRateKindInput, nullable: true }) input?: UserListContractedRateKindInput,
  ) {
    return this.service.publicContractedRateKinds(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContractedRateKinds(
    @Args({ name: 'input', type: () => UserListContractedRateKindInput, nullable: true }) input?: UserListContractedRateKindInput,
  ) {
    return this.service.publicCountContractedRateKinds(input)
  }

  @Query(() => [ContractedRateKind], { nullable: true })
  publicSelectContractedRateKinds(
    @Args({ name: 'input', type: () => UserListContractedRateKindInput, nullable: true }) input?: UserListContractedRateKindInput,
  ) {
    return this.service.publicSelectContractedRateKinds(input)
  }

  @Query(() => ContractedRateKind, { nullable: true })
  publicContractedRateKind(@Args('contractedRateKindId') contractedRateKindId: string) {
    return this.service.publicContractedRateKind(contractedRateKindId)
  }
}
