
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContactKindInput,
  UserListContactKindInput,
  UserUpdateContactKindInput,
  UserUpdateContactKindsInput,
  ApiContactKindDataAccessUserService,
  ContactKind,
} from '@case-clinical/api/contact-kind/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContactKindFeatureUserResolver {
  constructor(private readonly service: ApiContactKindDataAccessUserService) {}

  @Query(() => [ContactKind], { nullable: true })
  userContactKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactKindInput, nullable: true }) input?: UserListContactKindInput,
  ) {
    return this.service.userContactKinds(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContactKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactKindInput, nullable: true }) input?: UserListContactKindInput,
  ) {
    return this.service.userCountContactKinds(user.id, input)
  }

  @Query(() => [ContactKind], { nullable: true })
  userSelectContactKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContactKindInput, nullable: true }) input?: UserListContactKindInput,
  ) {
    return this.service.userSelectContactKinds(user.id, input)
  }







  @Query(() => ContactKind, { nullable: true })
  userContactKind(@CtxUser() user: User, @Args('contactKindId') contactKindId: string) {
    return this.service.userContactKind(user.id, contactKindId)
  }

  @Mutation(() => ContactKind, { nullable: true })
  userCreateContactKind(@CtxUser() user: User, @Args('input') input: UserCreateContactKindInput,) {
    return this.service.userCreateContactKind(user.id, input)
  }

  @Mutation(() => ContactKind, { nullable: true })
  userUpdateContactKind(
    @CtxUser() user: User,
    @Args('contactKindId') contactKindId: string,
    @Args('input') input: UserUpdateContactKindInput,
  ) {
    return this.service.userUpdateContactKind(user.id, contactKindId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContactKinds(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContactKindsInput,
  ) {
    return this.service.userUpdateContactKinds(user.id, input)
  }

  @Mutation(() => ContactKind, { nullable: true })
  userDeleteContactKind(@CtxUser() user: User, @Args('contactKindId') contactKindId: string) {
    return this.service.userDeleteContactKind(user.id, contactKindId)
  }
}

