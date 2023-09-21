
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateReconciliationPeriodTypeInput,
  UserListReconciliationPeriodTypeInput,
  UserUpdateReconciliationPeriodTypeInput,
  UserUpdateReconciliationPeriodTypesInput,
  ApiReconciliationPeriodTypeDataAccessUserService,
  ReconciliationPeriodType,
} from '@case-clinical/api/reconciliation-period-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiReconciliationPeriodTypeFeatureUserResolver {
  constructor(private readonly service: ApiReconciliationPeriodTypeDataAccessUserService) {}

  @Query(() => [ReconciliationPeriodType], { nullable: true })
  userReconciliationPeriodTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListReconciliationPeriodTypeInput, nullable: true }) input?: UserListReconciliationPeriodTypeInput,
  ) {
    return this.service.userReconciliationPeriodTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountReconciliationPeriodTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListReconciliationPeriodTypeInput, nullable: true }) input?: UserListReconciliationPeriodTypeInput,
  ) {
    return this.service.userCountReconciliationPeriodTypes(user.id, input)
  }

  @Query(() => [ReconciliationPeriodType], { nullable: true })
  userSelectReconciliationPeriodTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListReconciliationPeriodTypeInput, nullable: true }) input?: UserListReconciliationPeriodTypeInput,
  ) {
    return this.service.userSelectReconciliationPeriodTypes(user.id, input)
  }







  @Query(() => ReconciliationPeriodType, { nullable: true })
  userReconciliationPeriodType(@CtxUser() user: User, @Args('reconciliationPeriodTypeId') reconciliationPeriodTypeId: string) {
    return this.service.userReconciliationPeriodType(user.id, reconciliationPeriodTypeId)
  }

  @Mutation(() => ReconciliationPeriodType, { nullable: true })
  userCreateReconciliationPeriodType(@CtxUser() user: User, @Args('input') input: UserCreateReconciliationPeriodTypeInput,) {
    return this.service.userCreateReconciliationPeriodType(user.id, input)
  }

  @Mutation(() => ReconciliationPeriodType, { nullable: true })
  userUpdateReconciliationPeriodType(
    @CtxUser() user: User,
    @Args('reconciliationPeriodTypeId') reconciliationPeriodTypeId: string,
    @Args('input') input: UserUpdateReconciliationPeriodTypeInput,
  ) {
    return this.service.userUpdateReconciliationPeriodType(user.id, reconciliationPeriodTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateReconciliationPeriodTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateReconciliationPeriodTypesInput,
  ) {
    return this.service.userUpdateReconciliationPeriodTypes(user.id, input)
  }

  @Mutation(() => ReconciliationPeriodType, { nullable: true })
  userDeleteReconciliationPeriodType(@CtxUser() user: User, @Args('reconciliationPeriodTypeId') reconciliationPeriodTypeId: string) {
    return this.service.userDeleteReconciliationPeriodType(user.id, reconciliationPeriodTypeId)
  }
}

