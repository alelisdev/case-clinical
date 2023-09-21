
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContactTagInput,
  ApiContactTagDataAccessPublicService,
  ContactTag,
} from '@case-clinical/api/contact-tag/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContactTagFeaturePublicResolver {
  constructor(private readonly service: ApiContactTagDataAccessPublicService) {}
           
  @Query(() => [ContactTag], { nullable: true })
  publicContactTags(
    @Args({ name: 'input', type: () => UserListContactTagInput, nullable: true }) input?: UserListContactTagInput,
  ) {
    return this.service.publicContactTags(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContactTags(
    @Args({ name: 'input', type: () => UserListContactTagInput, nullable: true }) input?: UserListContactTagInput,
  ) {
    return this.service.publicCountContactTags(input)
  }

  @Query(() => [ContactTag], { nullable: true })
  publicSelectContactTags(
    @Args({ name: 'input', type: () => UserListContactTagInput, nullable: true }) input?: UserListContactTagInput,
  ) {
    return this.service.publicSelectContactTags(input)
  }

  @Query(() => ContactTag, { nullable: true })
  publicContactTag(@Args('contactTagId') contactTagId: string) {
    return this.service.publicContactTag(contactTagId)
  }
}
