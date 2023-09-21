
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAccountStatusInput,
  UserListAccountStatusInput,
  UserUpdateAccountStatusInput,
  UserUpdateAccountStatusesInput,
  ApiAccountStatusDataAccessUserService,
  AccountStatus,
} from '@case-clinical/api/account-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAccountStatusFeatureUserResolver {
  constructor(private readonly service: ApiAccountStatusDataAccessUserService) {}

  @Query(() => [AccountStatus], { nullable: true })
  userAccountStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAccountStatusInput, nullable: true }) input?: UserListAccountStatusInput,
  ) {
    return this.service.userAccountStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAccountStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAccountStatusInput, nullable: true }) input?: UserListAccountStatusInput,
  ) {
    return this.service.userCountAccountStatuses(user.id, input)
  }

  @Query(() => [AccountStatus], { nullable: true })
  userSelectAccountStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAccountStatusInput, nullable: true }) input?: UserListAccountStatusInput,
  ) {
    return this.service.userSelectAccountStatuses(user.id, input)
  }







  @Query(() => AccountStatus, { nullable: true })
  userAccountStatus(@CtxUser() user: User, @Args('accountStatusId') accountStatusId: string) {
    return this.service.userAccountStatus(user.id, accountStatusId)
  }

  @Mutation(() => AccountStatus, { nullable: true })
  userCreateAccountStatus(@CtxUser() user: User, @Args('input') input: UserCreateAccountStatusInput,) {
    return this.service.userCreateAccountStatus(user.id, input)
  }

  @Mutation(() => AccountStatus, { nullable: true })
  userUpdateAccountStatus(
    @CtxUser() user: User,
    @Args('accountStatusId') accountStatusId: string,
    @Args('input') input: UserUpdateAccountStatusInput,
  ) {
    return this.service.userUpdateAccountStatus(user.id, accountStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAccountStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAccountStatusesInput,
  ) {
    return this.service.userUpdateAccountStatuses(user.id, input)
  }

  @Mutation(() => AccountStatus, { nullable: true })
  userDeleteAccountStatus(@CtxUser() user: User, @Args('accountStatusId') accountStatusId: string) {
    return this.service.userDeleteAccountStatus(user.id, accountStatusId)
  }
}

