
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateBankInput,
  UserListBankInput,
  UserUpdateBankInput,
  UserUpdateBanksInput,
  ApiBankDataAccessUserService,
  Bank,
} from '@case-clinical/api/bank/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiBankFeatureUserResolver {
  constructor(private readonly service: ApiBankDataAccessUserService) {}

  @Query(() => [Bank], { nullable: true })
  userBanks(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBankInput, nullable: true }) input?: UserListBankInput,
  ) {
    return this.service.userBanks(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountBanks(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBankInput, nullable: true }) input?: UserListBankInput,
  ) {
    return this.service.userCountBanks(user.id, input)
  }

  @Query(() => [Bank], { nullable: true })
  userSelectBanks(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBankInput, nullable: true }) input?: UserListBankInput,
  ) {
    return this.service.userSelectBanks(user.id, input)
  }







  @Query(() => Bank, { nullable: true })
  userBank(@CtxUser() user: User, @Args('bankId') bankId: string) {
    return this.service.userBank(user.id, bankId)
  }

  @Mutation(() => Bank, { nullable: true })
  userCreateBank(@CtxUser() user: User, @Args('input') input: UserCreateBankInput,) {
    return this.service.userCreateBank(user.id, input)
  }

  @Mutation(() => Bank, { nullable: true })
  userUpdateBank(
    @CtxUser() user: User,
    @Args('bankId') bankId: string,
    @Args('input') input: UserUpdateBankInput,
  ) {
    return this.service.userUpdateBank(user.id, bankId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateBanks(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateBanksInput,
  ) {
    return this.service.userUpdateBanks(user.id, input)
  }

  @Mutation(() => Bank, { nullable: true })
  userDeleteBank(@CtxUser() user: User, @Args('bankId') bankId: string) {
    return this.service.userDeleteBank(user.id, bankId)
  }
}

