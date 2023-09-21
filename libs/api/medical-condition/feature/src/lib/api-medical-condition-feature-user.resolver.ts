
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateMedicalConditionInput,
  UserListMedicalConditionInput,
  UserUpdateMedicalConditionInput,
  UserUpdateMedicalConditionsInput,
  ApiMedicalConditionDataAccessUserService,
  MedicalCondition,
} from '@case-clinical/api/medical-condition/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiMedicalConditionFeatureUserResolver {
  constructor(private readonly service: ApiMedicalConditionDataAccessUserService) {}

  @Query(() => [MedicalCondition], { nullable: true })
  userMedicalConditions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalConditionInput, nullable: true }) input?: UserListMedicalConditionInput,
  ) {
    return this.service.userMedicalConditions(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountMedicalConditions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalConditionInput, nullable: true }) input?: UserListMedicalConditionInput,
  ) {
    return this.service.userCountMedicalConditions(user.id, input)
  }

  @Query(() => [MedicalCondition], { nullable: true })
  userSelectMedicalConditions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalConditionInput, nullable: true }) input?: UserListMedicalConditionInput,
  ) {
    return this.service.userSelectMedicalConditions(user.id, input)
  }







  @Query(() => MedicalCondition, { nullable: true })
  userMedicalCondition(@CtxUser() user: User, @Args('medicalConditionId') medicalConditionId: string) {
    return this.service.userMedicalCondition(user.id, medicalConditionId)
  }

  @Mutation(() => MedicalCondition, { nullable: true })
  userCreateMedicalCondition(@CtxUser() user: User, @Args('input') input: UserCreateMedicalConditionInput,) {
    return this.service.userCreateMedicalCondition(user.id, input)
  }

  @Mutation(() => MedicalCondition, { nullable: true })
  userUpdateMedicalCondition(
    @CtxUser() user: User,
    @Args('medicalConditionId') medicalConditionId: string,
    @Args('input') input: UserUpdateMedicalConditionInput,
  ) {
    return this.service.userUpdateMedicalCondition(user.id, medicalConditionId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateMedicalConditions(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateMedicalConditionsInput,
  ) {
    return this.service.userUpdateMedicalConditions(user.id, input)
  }

  @Mutation(() => MedicalCondition, { nullable: true })
  userDeleteMedicalCondition(@CtxUser() user: User, @Args('medicalConditionId') medicalConditionId: string) {
    return this.service.userDeleteMedicalCondition(user.id, medicalConditionId)
  }
}

