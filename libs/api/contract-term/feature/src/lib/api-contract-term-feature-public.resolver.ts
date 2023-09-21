
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContractTermInput,
  ApiContractTermDataAccessPublicService,
  ContractTerm,
} from '@case-clinical/api/contract-term/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContractTermFeaturePublicResolver {
  constructor(private readonly service: ApiContractTermDataAccessPublicService) {}
           
  @Query(() => [ContractTerm], { nullable: true })
  publicContractTerms(
    @Args({ name: 'input', type: () => UserListContractTermInput, nullable: true }) input?: UserListContractTermInput,
  ) {
    return this.service.publicContractTerms(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContractTerms(
    @Args({ name: 'input', type: () => UserListContractTermInput, nullable: true }) input?: UserListContractTermInput,
  ) {
    return this.service.publicCountContractTerms(input)
  }

  @Query(() => [ContractTerm], { nullable: true })
  publicSelectContractTerms(
    @Args({ name: 'input', type: () => UserListContractTermInput, nullable: true }) input?: UserListContractTermInput,
  ) {
    return this.service.publicSelectContractTerms(input)
  }

  @Query(() => ContractTerm, { nullable: true })
  publicContractTerm(@Args('contractTermId') contractTermId: string) {
    return this.service.publicContractTerm(contractTermId)
  }
}
