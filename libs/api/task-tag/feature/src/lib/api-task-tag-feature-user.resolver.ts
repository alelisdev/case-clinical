
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTaskTagInput,
  UserListTaskTagInput,
  UserUpdateTaskTagInput,
  UserUpdateTaskTagsInput,
  ApiTaskTagDataAccessUserService,
  TaskTag,
} from '@case-clinical/api/task-tag/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListTaskItemInput, TaskItem } from '@case-clinical/api/task-item/data-access'
import { UserListTagInput, Tag } from '@case-clinical/api/tag/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTaskTagFeatureUserResolver {
  constructor(private readonly service: ApiTaskTagDataAccessUserService) {}

  @Query(() => [TaskTag], { nullable: true })
  userTaskTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTaskTagInput, nullable: true }) input?: UserListTaskTagInput,
  ) {
    return this.service.userTaskTags(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTaskTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTaskTagInput, nullable: true }) input?: UserListTaskTagInput,
  ) {
    return this.service.userCountTaskTags(user.id, input)
  }

  @Query(() => [TaskTag], { nullable: true })
  userSelectTaskTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTaskTagInput, nullable: true }) input?: UserListTaskTagInput,
  ) {
    return this.service.userSelectTaskTags(user.id, input)
  }







  @Query(() => TaskTag, { nullable: true })
  userTaskTag(@CtxUser() user: User, @Args('taskTagId') taskTagId: string) {
    return this.service.userTaskTag(user.id, taskTagId)
  }

  @Mutation(() => TaskTag, { nullable: true })
  userCreateTaskTag(@CtxUser() user: User, @Args('input') input: UserCreateTaskTagInput,) {
    return this.service.userCreateTaskTag(user.id, input)
  }

  @Mutation(() => TaskTag, { nullable: true })
  userUpdateTaskTag(
    @CtxUser() user: User,
    @Args('taskTagId') taskTagId: string,
    @Args('input') input: UserUpdateTaskTagInput,
  ) {
    return this.service.userUpdateTaskTag(user.id, taskTagId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateTaskTags(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateTaskTagsInput,
  ) {
    return this.service.userUpdateTaskTags(user.id, input)
  }

  @Mutation(() => TaskTag, { nullable: true })
  userDeleteTaskTag(@CtxUser() user: User, @Args('taskTagId') taskTagId: string) {
    return this.service.userDeleteTaskTag(user.id, taskTagId)
  }
}

