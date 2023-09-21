
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateGuidelineUsedInput,
  UserListGuidelineUsedInput,
  UserUpdateGuidelineUsedInput,
  UserUpdateGuidelineUsedsInput,
  ApiGuidelineUsedDataAccessUserService,
  GuidelineUsed,
} from '@case-clinical/api/guideline-used/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiGuidelineUsedFeatureUserResolver {
  constructor(private readonly service: ApiGuidelineUsedDataAccessUserService) {}

  @Query(() => [GuidelineUsed], { nullable: true })
  userGuidelineUseds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListGuidelineUsedInput, nullable: true }) input?: UserListGuidelineUsedInput,
  ) {
    return this.service.userGuidelineUseds(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountGuidelineUseds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListGuidelineUsedInput, nullable: true }) input?: UserListGuidelineUsedInput,
  ) {
    return this.service.userCountGuidelineUseds(user.id, input)
  }

  @Query(() => [GuidelineUsed], { nullable: true })
  userSelectGuidelineUseds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListGuidelineUsedInput, nullable: true }) input?: UserListGuidelineUsedInput,
  ) {
    return this.service.userSelectGuidelineUseds(user.id, input)
  }







  @Query(() => GuidelineUsed, { nullable: true })
  userGuidelineUsed(@CtxUser() user: User, @Args('guidelineUsedId') guidelineUsedId: string) {
    return this.service.userGuidelineUsed(user.id, guidelineUsedId)
  }

  @Mutation(() => GuidelineUsed, { nullable: true })
  userCreateGuidelineUsed(@CtxUser() user: User, @Args('input') input: UserCreateGuidelineUsedInput,) {
    return this.service.userCreateGuidelineUsed(user.id, input)
  }

  @Mutation(() => GuidelineUsed, { nullable: true })
  userUpdateGuidelineUsed(
    @CtxUser() user: User,
    @Args('guidelineUsedId') guidelineUsedId: string,
    @Args('input') input: UserUpdateGuidelineUsedInput,
  ) {
    return this.service.userUpdateGuidelineUsed(user.id, guidelineUsedId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateGuidelineUseds(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateGuidelineUsedsInput,
  ) {
    return this.service.userUpdateGuidelineUseds(user.id, input)
  }

  @Mutation(() => GuidelineUsed, { nullable: true })
  userDeleteGuidelineUsed(@CtxUser() user: User, @Args('guidelineUsedId') guidelineUsedId: string) {
    return this.service.userDeleteGuidelineUsed(user.id, guidelineUsedId)
  }
}

