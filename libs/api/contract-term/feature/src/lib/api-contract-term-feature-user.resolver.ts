
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContractTermInput,
  UserListContractTermInput,
  UserUpdateContractTermInput,
  UserUpdateContractTermsInput,
  ApiContractTermDataAccessUserService,
  ContractTerm,
} from '@case-clinical/api/contract-term/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListContractInput, Contract } from '@case-clinical/api/contract/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContractTermFeatureUserResolver {
  constructor(private readonly service: ApiContractTermDataAccessUserService) {}

  @Query(() => [ContractTerm], { nullable: true })
  userContractTerms(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractTermInput, nullable: true }) input?: UserListContractTermInput,
  ) {
    return this.service.userContractTerms(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContractTerms(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractTermInput, nullable: true }) input?: UserListContractTermInput,
  ) {
    return this.service.userCountContractTerms(user.id, input)
  }

  @Query(() => [ContractTerm], { nullable: true })
  userSelectContractTerms(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractTermInput, nullable: true }) input?: UserListContractTermInput,
  ) {
    return this.service.userSelectContractTerms(user.id, input)
  }







  @Query(() => ContractTerm, { nullable: true })
  userContractTerm(@CtxUser() user: User, @Args('contractTermId') contractTermId: string) {
    return this.service.userContractTerm(user.id, contractTermId)
  }

  @Mutation(() => ContractTerm, { nullable: true })
  userCreateContractTerm(@CtxUser() user: User, @Args('input') input: UserCreateContractTermInput,) {
    return this.service.userCreateContractTerm(user.id, input)
  }

  @Mutation(() => ContractTerm, { nullable: true })
  userUpdateContractTerm(
    @CtxUser() user: User,
    @Args('contractTermId') contractTermId: string,
    @Args('input') input: UserUpdateContractTermInput,
  ) {
    return this.service.userUpdateContractTerm(user.id, contractTermId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContractTerms(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContractTermsInput,
  ) {
    return this.service.userUpdateContractTerms(user.id, input)
  }

  @Mutation(() => ContractTerm, { nullable: true })
  userDeleteContractTerm(@CtxUser() user: User, @Args('contractTermId') contractTermId: string) {
    return this.service.userDeleteContractTerm(user.id, contractTermId)
  }
}

