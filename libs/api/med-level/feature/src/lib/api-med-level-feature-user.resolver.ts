
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateMedLevelInput,
  UserListMedLevelInput,
  UserUpdateMedLevelInput,
  UserUpdateMedLevelsInput,
  ApiMedLevelDataAccessUserService,
  MedLevel,
} from '@case-clinical/api/med-level/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiMedLevelFeatureUserResolver {
  constructor(private readonly service: ApiMedLevelDataAccessUserService) {}

  @Query(() => [MedLevel], { nullable: true })
  userMedLevels(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedLevelInput, nullable: true }) input?: UserListMedLevelInput,
  ) {
    return this.service.userMedLevels(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountMedLevels(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedLevelInput, nullable: true }) input?: UserListMedLevelInput,
  ) {
    return this.service.userCountMedLevels(user.id, input)
  }

  @Query(() => [MedLevel], { nullable: true })
  userSelectMedLevels(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedLevelInput, nullable: true }) input?: UserListMedLevelInput,
  ) {
    return this.service.userSelectMedLevels(user.id, input)
  }







  @Query(() => MedLevel, { nullable: true })
  userMedLevel(@CtxUser() user: User, @Args('medLevelId') medLevelId: string) {
    return this.service.userMedLevel(user.id, medLevelId)
  }

  @Mutation(() => MedLevel, { nullable: true })
  userCreateMedLevel(@CtxUser() user: User, @Args('input') input: UserCreateMedLevelInput,) {
    return this.service.userCreateMedLevel(user.id, input)
  }

  @Mutation(() => MedLevel, { nullable: true })
  userUpdateMedLevel(
    @CtxUser() user: User,
    @Args('medLevelId') medLevelId: string,
    @Args('input') input: UserUpdateMedLevelInput,
  ) {
    return this.service.userUpdateMedLevel(user.id, medLevelId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateMedLevels(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateMedLevelsInput,
  ) {
    return this.service.userUpdateMedLevels(user.id, input)
  }

  @Mutation(() => MedLevel, { nullable: true })
  userDeleteMedLevel(@CtxUser() user: User, @Args('medLevelId') medLevelId: string) {
    return this.service.userDeleteMedLevel(user.id, medLevelId)
  }
}

