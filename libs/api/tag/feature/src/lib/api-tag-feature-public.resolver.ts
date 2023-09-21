
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListTagInput,
  ApiTagDataAccessPublicService,
  Tag,
} from '@case-clinical/api/tag/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTagFeaturePublicResolver {
  constructor(private readonly service: ApiTagDataAccessPublicService) {}
           
  @Query(() => [Tag], { nullable: true })
  publicTags(
    @Args({ name: 'input', type: () => UserListTagInput, nullable: true }) input?: UserListTagInput,
  ) {
    return this.service.publicTags(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountTags(
    @Args({ name: 'input', type: () => UserListTagInput, nullable: true }) input?: UserListTagInput,
  ) {
    return this.service.publicCountTags(input)
  }

  @Query(() => [Tag], { nullable: true })
  publicSelectTags(
    @Args({ name: 'input', type: () => UserListTagInput, nullable: true }) input?: UserListTagInput,
  ) {
    return this.service.publicSelectTags(input)
  }

  @Query(() => Tag, { nullable: true })
  publicTag(@Args('tagId') tagId: string) {
    return this.service.publicTag(tagId)
  }
}
