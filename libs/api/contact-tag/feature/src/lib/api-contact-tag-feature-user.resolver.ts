
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContactTagInput,
  UserListContactTagInput,
  UserUpdateContactTagInput,
  UserUpdateContactTagsInput,
  ApiContactTagDataAccessUserService,
  ContactTag,
} from '@case-clinical/api/contact-tag/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListContactInput, Contact } from '@case-clinical/api/contact/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContactTagFeatureUserResolver {
  constructor(private readonly service: ApiContactTagDataAccessUserService) {}

  @Query(() => [ContactTag], { nullable: true })
  userContactTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactTagInput, nullable: true }) input?: UserListContactTagInput,
  ) {
    return this.service.userContactTags(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContactTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactTagInput, nullable: true }) input?: UserListContactTagInput,
  ) {
    return this.service.userCountContactTags(user.id, input)
  }

  @Query(() => [ContactTag], { nullable: true })
  userSelectContactTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactTagInput, nullable: true }) input?: UserListContactTagInput,
  ) {
    return this.service.userSelectContactTags(user.id, input)
  }







  @Query(() => ContactTag, { nullable: true })
  userContactTag(@CtxUser() user: User, @Args('contactTagId') contactTagId: string) {
    return this.service.userContactTag(user.id, contactTagId)
  }

  @Mutation(() => ContactTag, { nullable: true })
  userCreateContactTag(@CtxUser() user: User, @Args('input') input: UserCreateContactTagInput,) {
    return this.service.userCreateContactTag(user.id, input)
  }

  @Mutation(() => ContactTag, { nullable: true })
  userUpdateContactTag(
    @CtxUser() user: User,
    @Args('contactTagId') contactTagId: string,
    @Args('input') input: UserUpdateContactTagInput,
  ) {
    return this.service.userUpdateContactTag(user.id, contactTagId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContactTags(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContactTagsInput,
  ) {
    return this.service.userUpdateContactTags(user.id, input)
  }

  @Mutation(() => ContactTag, { nullable: true })
  userDeleteContactTag(@CtxUser() user: User, @Args('contactTagId') contactTagId: string) {
    return this.service.userDeleteContactTag(user.id, contactTagId)
  }
}

