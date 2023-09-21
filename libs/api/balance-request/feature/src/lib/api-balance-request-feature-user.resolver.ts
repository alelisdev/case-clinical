
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateBalanceRequestInput,
  UserListBalanceRequestInput,
  UserUpdateBalanceRequestInput,
  UserUpdateBalanceRequestsInput,
  ApiBalanceRequestDataAccessUserService,
  BalanceRequest,
} from '@case-clinical/api/balance-request/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiBalanceRequestFeatureUserResolver {
  constructor(private readonly service: ApiBalanceRequestDataAccessUserService) {}

  @Query(() => [BalanceRequest], { nullable: true })
  userBalanceRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBalanceRequestInput, nullable: true }) input?: UserListBalanceRequestInput,
  ) {
    return this.service.userBalanceRequests(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountBalanceRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBalanceRequestInput, nullable: true }) input?: UserListBalanceRequestInput,
  ) {
    return this.service.userCountBalanceRequests(user.id, input)
  }

  @Query(() => [BalanceRequest], { nullable: true })
  userSelectBalanceRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBalanceRequestInput, nullable: true }) input?: UserListBalanceRequestInput,
  ) {
    return this.service.userSelectBalanceRequests(user.id, input)
  }







  @Query(() => BalanceRequest, { nullable: true })
  userBalanceRequest(@CtxUser() user: User, @Args('balanceRequestId') balanceRequestId: string) {
    return this.service.userBalanceRequest(user.id, balanceRequestId)
  }

  @Mutation(() => BalanceRequest, { nullable: true })
  userCreateBalanceRequest(@CtxUser() user: User, @Args('input') input: UserCreateBalanceRequestInput,) {
    return this.service.userCreateBalanceRequest(user.id, input)
  }

  @Mutation(() => BalanceRequest, { nullable: true })
  userUpdateBalanceRequest(
    @CtxUser() user: User,
    @Args('balanceRequestId') balanceRequestId: string,
    @Args('input') input: UserUpdateBalanceRequestInput,
  ) {
    return this.service.userUpdateBalanceRequest(user.id, balanceRequestId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateBalanceRequests(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateBalanceRequestsInput,
  ) {
    return this.service.userUpdateBalanceRequests(user.id, input)
  }

  @Mutation(() => BalanceRequest, { nullable: true })
  userDeleteBalanceRequest(@CtxUser() user: User, @Args('balanceRequestId') balanceRequestId: string) {
    return this.service.userDeleteBalanceRequest(user.id, balanceRequestId)
  }
}

