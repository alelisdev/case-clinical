
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTaskItemInput,
  UserListTaskItemInput,
  UserUpdateTaskItemInput,
  UserUpdateTaskItemsInput,
  ApiTaskItemDataAccessUserService,
  TaskItem,
} from '@case-clinical/api/task-item/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'



import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { UserListUserInput, User } from '@case-clinical/api/user/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTaskItemFeatureUserResolver {
  constructor(private readonly service: ApiTaskItemDataAccessUserService) {}

  @Query(() => [TaskItem], { nullable: true })
  userTaskItems(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTaskItemInput, nullable: true }) input?: UserListTaskItemInput,
  ) {
    return this.service.userTaskItems(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTaskItems(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTaskItemInput, nullable: true }) input?: UserListTaskItemInput,
  ) {
    return this.service.userCountTaskItems(user.id, input)
  }

  @Query(() => [TaskItem], { nullable: true })
  userSelectTaskItems(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTaskItemInput, nullable: true }) input?: UserListTaskItemInput,
  ) {
    return this.service.userSelectTaskItems(user.id, input)
  }







  @Query(() => TaskItem, { nullable: true })
  userTaskItem(@CtxUser() user: User, @Args('taskItemId') taskItemId: string) {
    return this.service.userTaskItem(user.id, taskItemId)
  }

  @Mutation(() => TaskItem, { nullable: true })
  userCreateTaskItem(@CtxUser() user: User, @Args('input') input: UserCreateTaskItemInput,) {
    return this.service.userCreateTaskItem(user.id, input)
  }

  @Mutation(() => TaskItem, { nullable: true })
  userUpdateTaskItem(
    @CtxUser() user: User,
    @Args('taskItemId') taskItemId: string,
    @Args('input') input: UserUpdateTaskItemInput,
  ) {
    return this.service.userUpdateTaskItem(user.id, taskItemId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateTaskItems(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateTaskItemsInput,
  ) {
    return this.service.userUpdateTaskItems(user.id, input)
  }

  @Mutation(() => TaskItem, { nullable: true })
  userDeleteTaskItem(@CtxUser() user: User, @Args('taskItemId') taskItemId: string) {
    return this.service.userDeleteTaskItem(user.id, taskItemId)
  }
}

