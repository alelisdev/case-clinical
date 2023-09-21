
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContactEmailInput,
  AdminListContactEmailInput,
  AdminUpdateContactEmailInput,
  ApiContactEmailDataAccessAdminService,
  ContactEmail
} from '@case-clinical/api/contact-email/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListContactInput, Contact } from '@case-clinical/api/contact/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContactEmailFeatureAdminResolver {
  constructor(private readonly service: ApiContactEmailDataAccessAdminService) {}

  @Query(() => [ContactEmail], { nullable: true })
  adminContactEmails(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactEmailInput, nullable: true }) input?: AdminListContactEmailInput,
  ) {
    return this.service.adminContactEmails(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContactEmails(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactEmailInput, nullable: true }) input?: AdminListContactEmailInput,
  ) {
    return this.service.adminCountContactEmails(admin.id, input)
  }





  @Query(() => ContactEmail, { nullable: true })
  adminContactEmail(@CtxUser() admin: User, @Args('contactEmailId') contactEmailId: string) {
    return this.service.adminContactEmail(admin.id, contactEmailId)
  }

  @Mutation(() => ContactEmail, { nullable: true })
  adminCreateContactEmail(@CtxUser() admin: User, @Args('input') input: AdminCreateContactEmailInput,) {
    return this.service.adminCreateContactEmail(admin.id, input)
  }

  @Mutation(() => ContactEmail, { nullable: true })
  adminUpdateContactEmail(
    @CtxUser() admin: User,
    @Args('contactEmailId') contactEmailId: string,
    @Args('input') input: AdminUpdateContactEmailInput,
  ) {
    return this.service.adminUpdateContactEmail(admin.id, contactEmailId, input)
  }

  @Mutation(() => ContactEmail, { nullable: true })
  adminDeleteContactEmail(@CtxUser() admin: User, @Args('contactEmailId') contactEmailId: string) {
    return this.service.adminDeleteContactEmail(admin.id, contactEmailId)
  }
}

