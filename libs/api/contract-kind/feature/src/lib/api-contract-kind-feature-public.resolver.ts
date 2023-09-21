
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContractKindInput,
  ApiContractKindDataAccessPublicService,
  ContractKind,
} from '@case-clinical/api/contract-kind/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContractKindFeaturePublicResolver {
  constructor(private readonly service: ApiContractKindDataAccessPublicService) {}
           
  @Query(() => [ContractKind], { nullable: true })
  publicContractKinds(
    @Args({ name: 'input', type: () => UserListContractKindInput, nullable: true }) input?: UserListContractKindInput,
  ) {
    return this.service.publicContractKinds(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContractKinds(
    @Args({ name: 'input', type: () => UserListContractKindInput, nullable: true }) input?: UserListContractKindInput,
  ) {
    return this.service.publicCountContractKinds(input)
  }

  @Query(() => [ContractKind], { nullable: true })
  publicSelectContractKinds(
    @Args({ name: 'input', type: () => UserListContractKindInput, nullable: true }) input?: UserListContractKindInput,
  ) {
    return this.service.publicSelectContractKinds(input)
  }

  @Query(() => ContractKind, { nullable: true })
  publicContractKind(@Args('contractKindId') contractKindId: string) {
    return this.service.publicContractKind(contractKindId)
  }
}
