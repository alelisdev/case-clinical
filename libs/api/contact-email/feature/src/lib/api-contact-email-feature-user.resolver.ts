
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContactEmailInput,
  UserListContactEmailInput,
  UserUpdateContactEmailInput,
  UserUpdateContactEmailsInput,
  ApiContactEmailDataAccessUserService,
  ContactEmail,
} from '@case-clinical/api/contact-email/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListContactInput, Contact } from '@case-clinical/api/contact/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContactEmailFeatureUserResolver {
  constructor(private readonly service: ApiContactEmailDataAccessUserService) {}

  @Query(() => [ContactEmail], { nullable: true })
  userContactEmails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactEmailInput, nullable: true }) input?: UserListContactEmailInput,
  ) {
    return this.service.userContactEmails(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContactEmails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactEmailInput, nullable: true }) input?: UserListContactEmailInput,
  ) {
    return this.service.userCountContactEmails(user.id, input)
  }

  @Query(() => [ContactEmail], { nullable: true })
  userSelectContactEmails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactEmailInput, nullable: true }) input?: UserListContactEmailInput,
  ) {
    return this.service.userSelectContactEmails(user.id, input)
  }







  @Query(() => ContactEmail, { nullable: true })
  userContactEmail(@CtxUser() user: User, @Args('contactEmailId') contactEmailId: string) {
    return this.service.userContactEmail(user.id, contactEmailId)
  }

  @Mutation(() => ContactEmail, { nullable: true })
  userCreateContactEmail(@CtxUser() user: User, @Args('input') input: UserCreateContactEmailInput,) {
    return this.service.userCreateContactEmail(user.id, input)
  }

  @Mutation(() => ContactEmail, { nullable: true })
  userUpdateContactEmail(
    @CtxUser() user: User,
    @Args('contactEmailId') contactEmailId: string,
    @Args('input') input: UserUpdateContactEmailInput,
  ) {
    return this.service.userUpdateContactEmail(user.id, contactEmailId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContactEmails(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContactEmailsInput,
  ) {
    return this.service.userUpdateContactEmails(user.id, input)
  }

  @Mutation(() => ContactEmail, { nullable: true })
  userDeleteContactEmail(@CtxUser() user: User, @Args('contactEmailId') contactEmailId: string) {
    return this.service.userDeleteContactEmail(user.id, contactEmailId)
  }
}

