
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContactKindInput,
  ApiContactKindDataAccessPublicService,
  ContactKind,
} from '@case-clinical/api/contact-kind/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContactKindFeaturePublicResolver {
  constructor(private readonly service: ApiContactKindDataAccessPublicService) {}
           
  @Query(() => [ContactKind], { nullable: true })
  publicContactKinds(
    @Args({ name: 'input', type: () => UserListContactKindInput, nullable: true }) input?: UserListContactKindInput,
  ) {
    return this.service.publicContactKinds(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContactKinds(
    @Args({ name: 'input', type: () => UserListContactKindInput, nullable: true }) input?: UserListContactKindInput,
  ) {
    return this.service.publicCountContactKinds(input)
  }

  @Query(() => [ContactKind], { nullable: true })
  publicSelectContactKinds(
    @Args({ name: 'input', type: () => UserListContactKindInput, nullable: true }) input?: UserListContactKindInput,
  ) {
    return this.service.publicSelectContactKinds(input)
  }

  @Query(() => ContactKind, { nullable: true })
  publicContactKind(@Args('contactKindId') contactKindId: string) {
    return this.service.publicContactKind(contactKindId)
  }
}
