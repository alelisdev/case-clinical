
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTagInput,
  UserListTagInput,
  UserUpdateTagInput,
  UserUpdateTagsInput,
  ApiTagDataAccessUserService,
  Tag,
} from '@case-clinical/api/tag/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTagFeatureUserResolver {
  constructor(private readonly service: ApiTagDataAccessUserService) {}

  @Query(() => [Tag], { nullable: true })
  userTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTagInput, nullable: true }) input?: UserListTagInput,
  ) {
    return this.service.userTags(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTagInput, nullable: true }) input?: UserListTagInput,
  ) {
    return this.service.userCountTags(user.id, input)
  }

  @Query(() => [Tag], { nullable: true })
  userSelectTags(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTagInput, nullable: true }) input?: UserListTagInput,
  ) {
    return this.service.userSelectTags(user.id, input)
  }







  @Query(() => Tag, { nullable: true })
  userTag(@CtxUser() user: User, @Args('tagId') tagId: string) {
    return this.service.userTag(user.id, tagId)
  }

  @Mutation(() => Tag, { nullable: true })
  userCreateTag(@CtxUser() user: User, @Args('input') input: UserCreateTagInput,) {
    return this.service.userCreateTag(user.id, input)
  }

  @Mutation(() => Tag, { nullable: true })
  userUpdateTag(
    @CtxUser() user: User,
    @Args('tagId') tagId: string,
    @Args('input') input: UserUpdateTagInput,
  ) {
    return this.service.userUpdateTag(user.id, tagId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateTags(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateTagsInput,
  ) {
    return this.service.userUpdateTags(user.id, input)
  }

  @Mutation(() => Tag, { nullable: true })
  userDeleteTag(@CtxUser() user: User, @Args('tagId') tagId: string) {
    return this.service.userDeleteTag(user.id, tagId)
  }
}

