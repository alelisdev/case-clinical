
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePriorMedsToDateStatusInput,
  UserListPriorMedsToDateStatusInput,
  UserUpdatePriorMedsToDateStatusInput,
  UserUpdatePriorMedsToDateStatusesInput,
  ApiPriorMedsToDateStatusDataAccessUserService,
  PriorMedsToDateStatus,
} from '@case-clinical/api/prior-meds-to-date-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPriorMedsToDateStatusFeatureUserResolver {
  constructor(private readonly service: ApiPriorMedsToDateStatusDataAccessUserService) {}

  @Query(() => [PriorMedsToDateStatus], { nullable: true })
  userPriorMedsToDateStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorMedsToDateStatusInput, nullable: true }) input?: UserListPriorMedsToDateStatusInput,
  ) {
    return this.service.userPriorMedsToDateStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPriorMedsToDateStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorMedsToDateStatusInput, nullable: true }) input?: UserListPriorMedsToDateStatusInput,
  ) {
    return this.service.userCountPriorMedsToDateStatuses(user.id, input)
  }

  @Query(() => [PriorMedsToDateStatus], { nullable: true })
  userSelectPriorMedsToDateStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorMedsToDateStatusInput, nullable: true }) input?: UserListPriorMedsToDateStatusInput,
  ) {
    return this.service.userSelectPriorMedsToDateStatuses(user.id, input)
  }







  @Query(() => PriorMedsToDateStatus, { nullable: true })
  userPriorMedsToDateStatus(@CtxUser() user: User, @Args('priorMedsToDateStatusId') priorMedsToDateStatusId: string) {
    return this.service.userPriorMedsToDateStatus(user.id, priorMedsToDateStatusId)
  }

  @Mutation(() => PriorMedsToDateStatus, { nullable: true })
  userCreatePriorMedsToDateStatus(@CtxUser() user: User, @Args('input') input: UserCreatePriorMedsToDateStatusInput,) {
    return this.service.userCreatePriorMedsToDateStatus(user.id, input)
  }

  @Mutation(() => PriorMedsToDateStatus, { nullable: true })
  userUpdatePriorMedsToDateStatus(
    @CtxUser() user: User,
    @Args('priorMedsToDateStatusId') priorMedsToDateStatusId: string,
    @Args('input') input: UserUpdatePriorMedsToDateStatusInput,
  ) {
    return this.service.userUpdatePriorMedsToDateStatus(user.id, priorMedsToDateStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePriorMedsToDateStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePriorMedsToDateStatusesInput,
  ) {
    return this.service.userUpdatePriorMedsToDateStatuses(user.id, input)
  }

  @Mutation(() => PriorMedsToDateStatus, { nullable: true })
  userDeletePriorMedsToDateStatus(@CtxUser() user: User, @Args('priorMedsToDateStatusId') priorMedsToDateStatusId: string) {
    return this.service.userDeletePriorMedsToDateStatus(user.id, priorMedsToDateStatusId)
  }
}

