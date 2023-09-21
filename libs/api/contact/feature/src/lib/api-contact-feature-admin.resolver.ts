
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContactInput,
  AdminListContactInput,
  AdminUpdateContactInput,
  ApiContactDataAccessAdminService,
  Contact
} from '@case-clinical/api/contact/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListContactKindInput, ContactKind } from '@case-clinical/api/contact-kind/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContactFeatureAdminResolver {
  constructor(private readonly service: ApiContactDataAccessAdminService) {}

  @Query(() => [Contact], { nullable: true })
  adminContacts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactInput, nullable: true }) input?: AdminListContactInput,
  ) {
    return this.service.adminContacts(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContacts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactInput, nullable: true }) input?: AdminListContactInput,
  ) {
    return this.service.adminCountContacts(admin.id, input)
  }





  @Query(() => Contact, { nullable: true })
  adminContact(@CtxUser() admin: User, @Args('contactId') contactId: string) {
    return this.service.adminContact(admin.id, contactId)
  }

  @Mutation(() => Contact, { nullable: true })
  adminCreateContact(@CtxUser() admin: User, @Args('input') input: AdminCreateContactInput,) {
    return this.service.adminCreateContact(admin.id, input)
  }

  @Mutation(() => Contact, { nullable: true })
  adminUpdateContact(
    @CtxUser() admin: User,
    @Args('contactId') contactId: string,
    @Args('input') input: AdminUpdateContactInput,
  ) {
    return this.service.adminUpdateContact(admin.id, contactId, input)
  }

  @Mutation(() => Contact, { nullable: true })
  adminDeleteContact(@CtxUser() admin: User, @Args('contactId') contactId: string) {
    return this.service.adminDeleteContact(admin.id, contactId)
  }
}

