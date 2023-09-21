
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContactTagInput,
  AdminListContactTagInput,
  AdminUpdateContactTagInput,
  ApiContactTagDataAccessAdminService,
  ContactTag
} from '@case-clinical/api/contact-tag/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListContactInput, Contact } from '@case-clinical/api/contact/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContactTagFeatureAdminResolver {
  constructor(private readonly service: ApiContactTagDataAccessAdminService) {}

  @Query(() => [ContactTag], { nullable: true })
  adminContactTags(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactTagInput, nullable: true }) input?: AdminListContactTagInput,
  ) {
    return this.service.adminContactTags(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContactTags(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContactTagInput, nullable: true }) input?: AdminListContactTagInput,
  ) {
    return this.service.adminCountContactTags(admin.id, input)
  }





  @Query(() => ContactTag, { nullable: true })
  adminContactTag(@CtxUser() admin: User, @Args('contactTagId') contactTagId: string) {
    return this.service.adminContactTag(admin.id, contactTagId)
  }

  @Mutation(() => ContactTag, { nullable: true })
  adminCreateContactTag(@CtxUser() admin: User, @Args('input') input: AdminCreateContactTagInput,) {
    return this.service.adminCreateContactTag(admin.id, input)
  }

  @Mutation(() => ContactTag, { nullable: true })
  adminUpdateContactTag(
    @CtxUser() admin: User,
    @Args('contactTagId') contactTagId: string,
    @Args('input') input: AdminUpdateContactTagInput,
  ) {
    return this.service.adminUpdateContactTag(admin.id, contactTagId, input)
  }

  @Mutation(() => ContactTag, { nullable: true })
  adminDeleteContactTag(@CtxUser() admin: User, @Args('contactTagId') contactTagId: string) {
    return this.service.adminDeleteContactTag(admin.id, contactTagId)
  }
}

