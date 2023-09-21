
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContractedRateKindInput,
  UserListContractedRateKindInput,
  UserUpdateContractedRateKindInput,
  UserUpdateContractedRateKindsInput,
  ApiContractedRateKindDataAccessUserService,
  ContractedRateKind,
} from '@case-clinical/api/contracted-rate-kind/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContractedRateKindFeatureUserResolver {
  constructor(private readonly service: ApiContractedRateKindDataAccessUserService) {}

  @Query(() => [ContractedRateKind], { nullable: true })
  userContractedRateKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractedRateKindInput, nullable: true }) input?: UserListContractedRateKindInput,
  ) {
    return this.service.userContractedRateKinds(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContractedRateKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractedRateKindInput, nullable: true }) input?: UserListContractedRateKindInput,
  ) {
    return this.service.userCountContractedRateKinds(user.id, input)
  }

  @Query(() => [ContractedRateKind], { nullable: true })
  userSelectContractedRateKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractedRateKindInput, nullable: true }) input?: UserListContractedRateKindInput,
  ) {
    return this.service.userSelectContractedRateKinds(user.id, input)
  }







  @Query(() => ContractedRateKind, { nullable: true })
  userContractedRateKind(@CtxUser() user: User, @Args('contractedRateKindId') contractedRateKindId: string) {
    return this.service.userContractedRateKind(user.id, contractedRateKindId)
  }

  @Mutation(() => ContractedRateKind, { nullable: true })
  userCreateContractedRateKind(@CtxUser() user: User, @Args('input') input: UserCreateContractedRateKindInput,) {
    return this.service.userCreateContractedRateKind(user.id, input)
  }

  @Mutation(() => ContractedRateKind, { nullable: true })
  userUpdateContractedRateKind(
    @CtxUser() user: User,
    @Args('contractedRateKindId') contractedRateKindId: string,
    @Args('input') input: UserUpdateContractedRateKindInput,
  ) {
    return this.service.userUpdateContractedRateKind(user.id, contractedRateKindId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContractedRateKinds(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContractedRateKindsInput,
  ) {
    return this.service.userUpdateContractedRateKinds(user.id, input)
  }

  @Mutation(() => ContractedRateKind, { nullable: true })
  userDeleteContractedRateKind(@CtxUser() user: User, @Args('contractedRateKindId') contractedRateKindId: string) {
    return this.service.userDeleteContractedRateKind(user.id, contractedRateKindId)
  }
}

