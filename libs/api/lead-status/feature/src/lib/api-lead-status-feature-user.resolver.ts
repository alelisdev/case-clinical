
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateLeadStatusInput,
  UserListLeadStatusInput,
  UserUpdateLeadStatusInput,
  UserUpdateLeadStatusesInput,
  ApiLeadStatusDataAccessUserService,
  LeadStatus,
} from '@case-clinical/api/lead-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiLeadStatusFeatureUserResolver {
  constructor(private readonly service: ApiLeadStatusDataAccessUserService) {}

  @Query(() => [LeadStatus], { nullable: true })
  userLeadStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadStatusInput, nullable: true }) input?: UserListLeadStatusInput,
  ) {
    return this.service.userLeadStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountLeadStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadStatusInput, nullable: true }) input?: UserListLeadStatusInput,
  ) {
    return this.service.userCountLeadStatuses(user.id, input)
  }

  @Query(() => [LeadStatus], { nullable: true })
  userSelectLeadStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadStatusInput, nullable: true }) input?: UserListLeadStatusInput,
  ) {
    return this.service.userSelectLeadStatuses(user.id, input)
  }







  @Query(() => LeadStatus, { nullable: true })
  userLeadStatus(@CtxUser() user: User, @Args('leadStatusId') leadStatusId: string) {
    return this.service.userLeadStatus(user.id, leadStatusId)
  }

  @Mutation(() => LeadStatus, { nullable: true })
  userCreateLeadStatus(@CtxUser() user: User, @Args('input') input: UserCreateLeadStatusInput,) {
    return this.service.userCreateLeadStatus(user.id, input)
  }

  @Mutation(() => LeadStatus, { nullable: true })
  userUpdateLeadStatus(
    @CtxUser() user: User,
    @Args('leadStatusId') leadStatusId: string,
    @Args('input') input: UserUpdateLeadStatusInput,
  ) {
    return this.service.userUpdateLeadStatus(user.id, leadStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateLeadStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateLeadStatusesInput,
  ) {
    return this.service.userUpdateLeadStatuses(user.id, input)
  }

  @Mutation(() => LeadStatus, { nullable: true })
  userDeleteLeadStatus(@CtxUser() user: User, @Args('leadStatusId') leadStatusId: string) {
    return this.service.userDeleteLeadStatus(user.id, leadStatusId)
  }
}

