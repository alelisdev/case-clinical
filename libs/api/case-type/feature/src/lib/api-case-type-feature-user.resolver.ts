
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCaseTypeInput,
  UserListCaseTypeInput,
  UserUpdateCaseTypeInput,
  UserUpdateCaseTypesInput,
  ApiCaseTypeDataAccessUserService,
  CaseType,
} from '@case-clinical/api/case-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCaseTypeFeatureUserResolver {
  constructor(private readonly service: ApiCaseTypeDataAccessUserService) {}

  @Query(() => [CaseType], { nullable: true })
  userCaseTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseTypeInput, nullable: true }) input?: UserListCaseTypeInput,
  ) {
    return this.service.userCaseTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCaseTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseTypeInput, nullable: true }) input?: UserListCaseTypeInput,
  ) {
    return this.service.userCountCaseTypes(user.id, input)
  }

  @Query(() => [CaseType], { nullable: true })
  userSelectCaseTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseTypeInput, nullable: true }) input?: UserListCaseTypeInput,
  ) {
    return this.service.userSelectCaseTypes(user.id, input)
  }







  @Query(() => CaseType, { nullable: true })
  userCaseType(@CtxUser() user: User, @Args('caseTypeId') caseTypeId: string) {
    return this.service.userCaseType(user.id, caseTypeId)
  }

  @Mutation(() => CaseType, { nullable: true })
  userCreateCaseType(@CtxUser() user: User, @Args('input') input: UserCreateCaseTypeInput,) {
    return this.service.userCreateCaseType(user.id, input)
  }

  @Mutation(() => CaseType, { nullable: true })
  userUpdateCaseType(
    @CtxUser() user: User,
    @Args('caseTypeId') caseTypeId: string,
    @Args('input') input: UserUpdateCaseTypeInput,
  ) {
    return this.service.userUpdateCaseType(user.id, caseTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCaseTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCaseTypesInput,
  ) {
    return this.service.userUpdateCaseTypes(user.id, input)
  }

  @Mutation(() => CaseType, { nullable: true })
  userDeleteCaseType(@CtxUser() user: User, @Args('caseTypeId') caseTypeId: string) {
    return this.service.userDeleteCaseType(user.id, caseTypeId)
  }
}

