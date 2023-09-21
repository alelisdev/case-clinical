
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContractInput,
  ApiContractDataAccessPublicService,
  Contract,
} from '@case-clinical/api/contract/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContractFeaturePublicResolver {
  constructor(private readonly service: ApiContractDataAccessPublicService) {}
           
  @Query(() => [Contract], { nullable: true })
  publicContracts(
    @Args({ name: 'input', type: () => UserListContractInput, nullable: true }) input?: UserListContractInput,
  ) {
    return this.service.publicContracts(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContracts(
    @Args({ name: 'input', type: () => UserListContractInput, nullable: true }) input?: UserListContractInput,
  ) {
    return this.service.publicCountContracts(input)
  }

  @Query(() => [Contract], { nullable: true })
  publicSelectContracts(
    @Args({ name: 'input', type: () => UserListContractInput, nullable: true }) input?: UserListContractInput,
  ) {
    return this.service.publicSelectContracts(input)
  }

  @Query(() => Contract, { nullable: true })
  publicContract(@Args('contractId') contractId: string) {
    return this.service.publicContract(contractId)
  }
}
