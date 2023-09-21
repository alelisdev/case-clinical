
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateGuidelineInput,
  UserListGuidelineInput,
  UserUpdateGuidelineInput,
  UserUpdateGuidelinesInput,
  ApiGuidelineDataAccessUserService,
  Guideline,
} from '@case-clinical/api/guideline/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiGuidelineFeatureUserResolver {
  constructor(private readonly service: ApiGuidelineDataAccessUserService) {}

  @Query(() => [Guideline], { nullable: true })
  userGuidelines(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListGuidelineInput, nullable: true }) input?: UserListGuidelineInput,
  ) {
    return this.service.userGuidelines(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountGuidelines(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListGuidelineInput, nullable: true }) input?: UserListGuidelineInput,
  ) {
    return this.service.userCountGuidelines(user.id, input)
  }

  @Query(() => [Guideline], { nullable: true })
  userSelectGuidelines(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListGuidelineInput, nullable: true }) input?: UserListGuidelineInput,
  ) {
    return this.service.userSelectGuidelines(user.id, input)
  }







  @Query(() => Guideline, { nullable: true })
  userGuideline(@CtxUser() user: User, @Args('guidelineId') guidelineId: string) {
    return this.service.userGuideline(user.id, guidelineId)
  }

  @Mutation(() => Guideline, { nullable: true })
  userCreateGuideline(@CtxUser() user: User, @Args('input') input: UserCreateGuidelineInput,) {
    return this.service.userCreateGuideline(user.id, input)
  }

  @Mutation(() => Guideline, { nullable: true })
  userUpdateGuideline(
    @CtxUser() user: User,
    @Args('guidelineId') guidelineId: string,
    @Args('input') input: UserUpdateGuidelineInput,
  ) {
    return this.service.userUpdateGuideline(user.id, guidelineId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateGuidelines(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateGuidelinesInput,
  ) {
    return this.service.userUpdateGuidelines(user.id, input)
  }

  @Mutation(() => Guideline, { nullable: true })
  userDeleteGuideline(@CtxUser() user: User, @Args('guidelineId') guidelineId: string) {
    return this.service.userDeleteGuideline(user.id, guidelineId)
  }
}

