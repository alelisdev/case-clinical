
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContractKindInput,
  UserListContractKindInput,
  UserUpdateContractKindInput,
  UserUpdateContractKindsInput,
  ApiContractKindDataAccessUserService,
  ContractKind,
} from '@case-clinical/api/contract-kind/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContractKindFeatureUserResolver {
  constructor(private readonly service: ApiContractKindDataAccessUserService) {}

  @Query(() => [ContractKind], { nullable: true })
  userContractKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractKindInput, nullable: true }) input?: UserListContractKindInput,
  ) {
    return this.service.userContractKinds(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContractKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractKindInput, nullable: true }) input?: UserListContractKindInput,
  ) {
    return this.service.userCountContractKinds(user.id, input)
  }

  @Query(() => [ContractKind], { nullable: true })
  userSelectContractKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractKindInput, nullable: true }) input?: UserListContractKindInput,
  ) {
    return this.service.userSelectContractKinds(user.id, input)
  }







  @Query(() => ContractKind, { nullable: true })
  userContractKind(@CtxUser() user: User, @Args('contractKindId') contractKindId: string) {
    return this.service.userContractKind(user.id, contractKindId)
  }

  @Mutation(() => ContractKind, { nullable: true })
  userCreateContractKind(@CtxUser() user: User, @Args('input') input: UserCreateContractKindInput,) {
    return this.service.userCreateContractKind(user.id, input)
  }

  @Mutation(() => ContractKind, { nullable: true })
  userUpdateContractKind(
    @CtxUser() user: User,
    @Args('contractKindId') contractKindId: string,
    @Args('input') input: UserUpdateContractKindInput,
  ) {
    return this.service.userUpdateContractKind(user.id, contractKindId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContractKinds(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContractKindsInput,
  ) {
    return this.service.userUpdateContractKinds(user.id, input)
  }

  @Mutation(() => ContractKind, { nullable: true })
  userDeleteContractKind(@CtxUser() user: User, @Args('contractKindId') contractKindId: string) {
    return this.service.userDeleteContractKind(user.id, contractKindId)
  }
}

