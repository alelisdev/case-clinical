
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePriorAuthGuidelineInput,
  UserListPriorAuthGuidelineInput,
  UserUpdatePriorAuthGuidelineInput,
  UserUpdatePriorAuthGuidelinesInput,
  ApiPriorAuthGuidelineDataAccessUserService,
  PriorAuthGuideline,
} from '@case-clinical/api/prior-auth-guideline/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListGuidelineInput, Guideline } from '@case-clinical/api/guideline/data-access'
import { UserListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPriorAuthGuidelineFeatureUserResolver {
  constructor(private readonly service: ApiPriorAuthGuidelineDataAccessUserService) {}

  @Query(() => [PriorAuthGuideline], { nullable: true })
  userPriorAuthGuidelines(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthGuidelineInput, nullable: true }) input?: UserListPriorAuthGuidelineInput,
  ) {
    return this.service.userPriorAuthGuidelines(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPriorAuthGuidelines(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthGuidelineInput, nullable: true }) input?: UserListPriorAuthGuidelineInput,
  ) {
    return this.service.userCountPriorAuthGuidelines(user.id, input)
  }

  @Query(() => [PriorAuthGuideline], { nullable: true })
  userSelectPriorAuthGuidelines(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthGuidelineInput, nullable: true }) input?: UserListPriorAuthGuidelineInput,
  ) {
    return this.service.userSelectPriorAuthGuidelines(user.id, input)
  }







  @Query(() => PriorAuthGuideline, { nullable: true })
  userPriorAuthGuideline(@CtxUser() user: User, @Args('priorAuthGuidelineId') priorAuthGuidelineId: string) {
    return this.service.userPriorAuthGuideline(user.id, priorAuthGuidelineId)
  }

  @Mutation(() => PriorAuthGuideline, { nullable: true })
  userCreatePriorAuthGuideline(@CtxUser() user: User, @Args('input') input: UserCreatePriorAuthGuidelineInput,) {
    return this.service.userCreatePriorAuthGuideline(user.id, input)
  }

  @Mutation(() => PriorAuthGuideline, { nullable: true })
  userUpdatePriorAuthGuideline(
    @CtxUser() user: User,
    @Args('priorAuthGuidelineId') priorAuthGuidelineId: string,
    @Args('input') input: UserUpdatePriorAuthGuidelineInput,
  ) {
    return this.service.userUpdatePriorAuthGuideline(user.id, priorAuthGuidelineId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePriorAuthGuidelines(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePriorAuthGuidelinesInput,
  ) {
    return this.service.userUpdatePriorAuthGuidelines(user.id, input)
  }

  @Mutation(() => PriorAuthGuideline, { nullable: true })
  userDeletePriorAuthGuideline(@CtxUser() user: User, @Args('priorAuthGuidelineId') priorAuthGuidelineId: string) {
    return this.service.userDeletePriorAuthGuideline(user.id, priorAuthGuidelineId)
  }
}

