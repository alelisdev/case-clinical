
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListTaskItemInput,
  ApiTaskItemDataAccessPublicService,
  TaskItem,
} from '@case-clinical/api/task-item/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTaskItemFeaturePublicResolver {
  constructor(private readonly service: ApiTaskItemDataAccessPublicService) {}
           
  @Query(() => [TaskItem], { nullable: true })
  publicTaskItems(
    @Args({ name: 'input', type: () => UserListTaskItemInput, nullable: true }) input?: UserListTaskItemInput,
  ) {
    return this.service.publicTaskItems(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountTaskItems(
    @Args({ name: 'input', type: () => UserListTaskItemInput, nullable: true }) input?: UserListTaskItemInput,
  ) {
    return this.service.publicCountTaskItems(input)
  }

  @Query(() => [TaskItem], { nullable: true })
  publicSelectTaskItems(
    @Args({ name: 'input', type: () => UserListTaskItemInput, nullable: true }) input?: UserListTaskItemInput,
  ) {
    return this.service.publicSelectTaskItems(input)
  }

  @Query(() => TaskItem, { nullable: true })
  publicTaskItem(@Args('taskItemId') taskItemId: string) {
    return this.service.publicTaskItem(taskItemId)
  }
}
