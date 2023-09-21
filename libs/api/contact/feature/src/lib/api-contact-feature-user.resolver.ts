
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContactInput,
  UserListContactInput,
  UserUpdateContactInput,
  UserUpdateContactsInput,
  ApiContactDataAccessUserService,
  Contact,
} from '@case-clinical/api/contact/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListContactKindInput, ContactKind } from '@case-clinical/api/contact-kind/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContactFeatureUserResolver {
  constructor(private readonly service: ApiContactDataAccessUserService) {}

  @Query(() => [Contact], { nullable: true })
  userContacts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactInput, nullable: true }) input?: UserListContactInput,
  ) {
    return this.service.userContacts(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContacts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactInput, nullable: true }) input?: UserListContactInput,
  ) {
    return this.service.userCountContacts(user.id, input)
  }

  @Query(() => [Contact], { nullable: true })
  userSelectContacts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactInput, nullable: true }) input?: UserListContactInput,
  ) {
    return this.service.userSelectContacts(user.id, input)
  }







  @Query(() => Contact, { nullable: true })
  userContact(@CtxUser() user: User, @Args('contactId') contactId: string) {
    return this.service.userContact(user.id, contactId)
  }

  @Mutation(() => Contact, { nullable: true })
  userCreateContact(@CtxUser() user: User, @Args('input') input: UserCreateContactInput,) {
    return this.service.userCreateContact(user.id, input)
  }

  @Mutation(() => Contact, { nullable: true })
  userUpdateContact(
    @CtxUser() user: User,
    @Args('contactId') contactId: string,
    @Args('input') input: UserUpdateContactInput,
  ) {
    return this.service.userUpdateContact(user.id, contactId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContacts(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContactsInput,
  ) {
    return this.service.userUpdateContacts(user.id, input)
  }

  @Mutation(() => Contact, { nullable: true })
  userDeleteContact(@CtxUser() user: User, @Args('contactId') contactId: string) {
    return this.service.userDeleteContact(user.id, contactId)
  }
}

