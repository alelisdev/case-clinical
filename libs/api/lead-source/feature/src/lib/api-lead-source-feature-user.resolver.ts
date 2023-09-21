
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateLeadSourceInput,
  UserListLeadSourceInput,
  UserUpdateLeadSourceInput,
  UserUpdateLeadSourcesInput,
  ApiLeadSourceDataAccessUserService,
  LeadSource,
} from '@case-clinical/api/lead-source/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiLeadSourceFeatureUserResolver {
  constructor(private readonly service: ApiLeadSourceDataAccessUserService) {}

  @Query(() => [LeadSource], { nullable: true })
  userLeadSources(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadSourceInput, nullable: true }) input?: UserListLeadSourceInput,
  ) {
    return this.service.userLeadSources(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountLeadSources(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadSourceInput, nullable: true }) input?: UserListLeadSourceInput,
  ) {
    return this.service.userCountLeadSources(user.id, input)
  }

  @Query(() => [LeadSource], { nullable: true })
  userSelectLeadSources(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadSourceInput, nullable: true }) input?: UserListLeadSourceInput,
  ) {
    return this.service.userSelectLeadSources(user.id, input)
  }







  @Query(() => LeadSource, { nullable: true })
  userLeadSource(@CtxUser() user: User, @Args('leadSourceId') leadSourceId: string) {
    return this.service.userLeadSource(user.id, leadSourceId)
  }

  @Mutation(() => LeadSource, { nullable: true })
  userCreateLeadSource(@CtxUser() user: User, @Args('input') input: UserCreateLeadSourceInput,) {
    return this.service.userCreateLeadSource(user.id, input)
  }

  @Mutation(() => LeadSource, { nullable: true })
  userUpdateLeadSource(
    @CtxUser() user: User,
    @Args('leadSourceId') leadSourceId: string,
    @Args('input') input: UserUpdateLeadSourceInput,
  ) {
    return this.service.userUpdateLeadSource(user.id, leadSourceId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateLeadSources(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateLeadSourcesInput,
  ) {
    return this.service.userUpdateLeadSources(user.id, input)
  }

  @Mutation(() => LeadSource, { nullable: true })
  userDeleteLeadSource(@CtxUser() user: User, @Args('leadSourceId') leadSourceId: string) {
    return this.service.userDeleteLeadSource(user.id, leadSourceId)
  }
}

