
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTaskItemInput,
  AdminListTaskItemInput,
  AdminUpdateTaskItemInput,
  ApiTaskItemDataAccessAdminService,
  TaskItem
} from '@case-clinical/api/task-item/data-access'


import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { AdminListUserInput, User } from '@case-clinical/api/user/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTaskItemFeatureAdminResolver {
  constructor(private readonly service: ApiTaskItemDataAccessAdminService) {}

  @Query(() => [TaskItem], { nullable: true })
  adminTaskItems(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTaskItemInput, nullable: true }) input?: AdminListTaskItemInput,
  ) {
    return this.service.adminTaskItems(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTaskItems(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTaskItemInput, nullable: true }) input?: AdminListTaskItemInput,
  ) {
    return this.service.adminCountTaskItems(admin.id, input)
  }





  @Query(() => TaskItem, { nullable: true })
  adminTaskItem(@CtxUser() admin: User, @Args('taskItemId') taskItemId: string) {
    return this.service.adminTaskItem(admin.id, taskItemId)
  }

  @Mutation(() => TaskItem, { nullable: true })
  adminCreateTaskItem(@CtxUser() admin: User, @Args('input') input: AdminCreateTaskItemInput,) {
    return this.service.adminCreateTaskItem(admin.id, input)
  }

  @Mutation(() => TaskItem, { nullable: true })
  adminUpdateTaskItem(
    @CtxUser() admin: User,
    @Args('taskItemId') taskItemId: string,
    @Args('input') input: AdminUpdateTaskItemInput,
  ) {
    return this.service.adminUpdateTaskItem(admin.id, taskItemId, input)
  }

  @Mutation(() => TaskItem, { nullable: true })
  adminDeleteTaskItem(@CtxUser() admin: User, @Args('taskItemId') taskItemId: string) {
    return this.service.adminDeleteTaskItem(admin.id, taskItemId)
  }
}

