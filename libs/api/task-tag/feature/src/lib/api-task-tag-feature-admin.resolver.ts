
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTaskTagInput,
  AdminListTaskTagInput,
  AdminUpdateTaskTagInput,
  ApiTaskTagDataAccessAdminService,
  TaskTag
} from '@case-clinical/api/task-tag/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListTaskItemInput, TaskItem } from '@case-clinical/api/task-item/data-access'
import { AdminListTagInput, Tag } from '@case-clinical/api/tag/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTaskTagFeatureAdminResolver {
  constructor(private readonly service: ApiTaskTagDataAccessAdminService) {}

  @Query(() => [TaskTag], { nullable: true })
  adminTaskTags(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTaskTagInput, nullable: true }) input?: AdminListTaskTagInput,
  ) {
    return this.service.adminTaskTags(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTaskTags(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTaskTagInput, nullable: true }) input?: AdminListTaskTagInput,
  ) {
    return this.service.adminCountTaskTags(admin.id, input)
  }





  @Query(() => TaskTag, { nullable: true })
  adminTaskTag(@CtxUser() admin: User, @Args('taskTagId') taskTagId: string) {
    return this.service.adminTaskTag(admin.id, taskTagId)
  }

  @Mutation(() => TaskTag, { nullable: true })
  adminCreateTaskTag(@CtxUser() admin: User, @Args('input') input: AdminCreateTaskTagInput,) {
    return this.service.adminCreateTaskTag(admin.id, input)
  }

  @Mutation(() => TaskTag, { nullable: true })
  adminUpdateTaskTag(
    @CtxUser() admin: User,
    @Args('taskTagId') taskTagId: string,
    @Args('input') input: AdminUpdateTaskTagInput,
  ) {
    return this.service.adminUpdateTaskTag(admin.id, taskTagId, input)
  }

  @Mutation(() => TaskTag, { nullable: true })
  adminDeleteTaskTag(@CtxUser() admin: User, @Args('taskTagId') taskTagId: string) {
    return this.service.adminDeleteTaskTag(admin.id, taskTagId)
  }
}

