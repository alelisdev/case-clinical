
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCasePreAccidentInput,
  UserListCasePreAccidentInput,
  UserUpdateCasePreAccidentInput,
  UserUpdateCasePreAccidentsInput,
  ApiCasePreAccidentDataAccessUserService,
  CasePreAccident,
} from '@case-clinical/api/case-pre-accident/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCasePreAccidentFeatureUserResolver {
  constructor(private readonly service: ApiCasePreAccidentDataAccessUserService) {}

  @Query(() => [CasePreAccident], { nullable: true })
  userCasePreAccidents(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreAccidentInput, nullable: true }) input?: UserListCasePreAccidentInput,
  ) {
    return this.service.userCasePreAccidents(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCasePreAccidents(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreAccidentInput, nullable: true }) input?: UserListCasePreAccidentInput,
  ) {
    return this.service.userCountCasePreAccidents(user.id, input)
  }

  @Query(() => [CasePreAccident], { nullable: true })
  userSelectCasePreAccidents(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreAccidentInput, nullable: true }) input?: UserListCasePreAccidentInput,
  ) {
    return this.service.userSelectCasePreAccidents(user.id, input)
  }







  @Query(() => CasePreAccident, { nullable: true })
  userCasePreAccident(@CtxUser() user: User, @Args('casePreAccidentId') casePreAccidentId: string) {
    return this.service.userCasePreAccident(user.id, casePreAccidentId)
  }

  @Mutation(() => CasePreAccident, { nullable: true })
  userCreateCasePreAccident(@CtxUser() user: User, @Args('input') input: UserCreateCasePreAccidentInput,) {
    return this.service.userCreateCasePreAccident(user.id, input)
  }

  @Mutation(() => CasePreAccident, { nullable: true })
  userUpdateCasePreAccident(
    @CtxUser() user: User,
    @Args('casePreAccidentId') casePreAccidentId: string,
    @Args('input') input: UserUpdateCasePreAccidentInput,
  ) {
    return this.service.userUpdateCasePreAccident(user.id, casePreAccidentId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCasePreAccidents(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCasePreAccidentsInput,
  ) {
    return this.service.userUpdateCasePreAccidents(user.id, input)
  }

  @Mutation(() => CasePreAccident, { nullable: true })
  userDeleteCasePreAccident(@CtxUser() user: User, @Args('casePreAccidentId') casePreAccidentId: string) {
    return this.service.userDeleteCasePreAccident(user.id, casePreAccidentId)
  }
}

