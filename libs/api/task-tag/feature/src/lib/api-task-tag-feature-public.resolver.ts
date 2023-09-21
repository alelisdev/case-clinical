
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListTaskTagInput,
  ApiTaskTagDataAccessPublicService,
  TaskTag,
} from '@case-clinical/api/task-tag/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTaskTagFeaturePublicResolver {
  constructor(private readonly service: ApiTaskTagDataAccessPublicService) {}
           
  @Query(() => [TaskTag], { nullable: true })
  publicTaskTags(
    @Args({ name: 'input', type: () => UserListTaskTagInput, nullable: true }) input?: UserListTaskTagInput,
  ) {
    return this.service.publicTaskTags(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountTaskTags(
    @Args({ name: 'input', type: () => UserListTaskTagInput, nullable: true }) input?: UserListTaskTagInput,
  ) {
    return this.service.publicCountTaskTags(input)
  }

  @Query(() => [TaskTag], { nullable: true })
  publicSelectTaskTags(
    @Args({ name: 'input', type: () => UserListTaskTagInput, nullable: true }) input?: UserListTaskTagInput,
  ) {
    return this.service.publicSelectTaskTags(input)
  }

  @Query(() => TaskTag, { nullable: true })
  publicTaskTag(@Args('taskTagId') taskTagId: string) {
    return this.service.publicTaskTag(taskTagId)
  }
}
