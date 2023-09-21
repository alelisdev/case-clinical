
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContactEmailInput,
  ApiContactEmailDataAccessPublicService,
  ContactEmail,
} from '@case-clinical/api/contact-email/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContactEmailFeaturePublicResolver {
  constructor(private readonly service: ApiContactEmailDataAccessPublicService) {}
           
  @Query(() => [ContactEmail], { nullable: true })
  publicContactEmails(
    @Args({ name: 'input', type: () => UserListContactEmailInput, nullable: true }) input?: UserListContactEmailInput,
  ) {
    return this.service.publicContactEmails(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContactEmails(
    @Args({ name: 'input', type: () => UserListContactEmailInput, nullable: true }) input?: UserListContactEmailInput,
  ) {
    return this.service.publicCountContactEmails(input)
  }

  @Query(() => [ContactEmail], { nullable: true })
  publicSelectContactEmails(
    @Args({ name: 'input', type: () => UserListContactEmailInput, nullable: true }) input?: UserListContactEmailInput,
  ) {
    return this.service.publicSelectContactEmails(input)
  }

  @Query(() => ContactEmail, { nullable: true })
  publicContactEmail(@Args('contactEmailId') contactEmailId: string) {
    return this.service.publicContactEmail(contactEmailId)
  }
}
