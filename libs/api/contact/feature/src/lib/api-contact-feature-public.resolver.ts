
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListContactInput,
  ApiContactDataAccessPublicService,
  Contact,
} from '@case-clinical/api/contact/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiContactFeaturePublicResolver {
  constructor(private readonly service: ApiContactDataAccessPublicService) {}
           
  @Query(() => [Contact], { nullable: true })
  publicContacts(
    @Args({ name: 'input', type: () => UserListContactInput, nullable: true }) input?: UserListContactInput,
  ) {
    return this.service.publicContacts(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountContacts(
    @Args({ name: 'input', type: () => UserListContactInput, nullable: true }) input?: UserListContactInput,
  ) {
    return this.service.publicCountContacts(input)
  }

  @Query(() => [Contact], { nullable: true })
  publicSelectContacts(
    @Args({ name: 'input', type: () => UserListContactInput, nullable: true }) input?: UserListContactInput,
  ) {
    return this.service.publicSelectContacts(input)
  }

  @Query(() => Contact, { nullable: true })
  publicContact(@Args('contactId') contactId: string) {
    return this.service.publicContact(contactId)
  }
}
