
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateLeadActionInput,
  UserListLeadActionInput,
  UserUpdateLeadActionInput,
  UserUpdateLeadActionsInput,
  ApiLeadActionDataAccessUserService,
  LeadAction,
} from '@case-clinical/api/lead-action/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLeadInput, Lead } from '@case-clinical/api/lead/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiLeadActionFeatureUserResolver {
  constructor(private readonly service: ApiLeadActionDataAccessUserService) {}

  @Query(() => [LeadAction], { nullable: true })
  userLeadActions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadActionInput, nullable: true }) input?: UserListLeadActionInput,
  ) {
    return this.service.userLeadActions(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountLeadActions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadActionInput, nullable: true }) input?: UserListLeadActionInput,
  ) {
    return this.service.userCountLeadActions(user.id, input)
  }

  @Query(() => [LeadAction], { nullable: true })
  userSelectLeadActions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadActionInput, nullable: true }) input?: UserListLeadActionInput,
  ) {
    return this.service.userSelectLeadActions(user.id, input)
  }







  @Query(() => LeadAction, { nullable: true })
  userLeadAction(@CtxUser() user: User, @Args('leadActionId') leadActionId: string) {
    return this.service.userLeadAction(user.id, leadActionId)
  }

  @Mutation(() => LeadAction, { nullable: true })
  userCreateLeadAction(@CtxUser() user: User, @Args('input') input: UserCreateLeadActionInput,) {
    return this.service.userCreateLeadAction(user.id, input)
  }

  @Mutation(() => LeadAction, { nullable: true })
  userUpdateLeadAction(
    @CtxUser() user: User,
    @Args('leadActionId') leadActionId: string,
    @Args('input') input: UserUpdateLeadActionInput,
  ) {
    return this.service.userUpdateLeadAction(user.id, leadActionId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateLeadActions(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateLeadActionsInput,
  ) {
    return this.service.userUpdateLeadActions(user.id, input)
  }

  @Mutation(() => LeadAction, { nullable: true })
  userDeleteLeadAction(@CtxUser() user: User, @Args('leadActionId') leadActionId: string) {
    return this.service.userDeleteLeadAction(user.id, leadActionId)
  }
}

