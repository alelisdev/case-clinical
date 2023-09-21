
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCasePreProblemInput,
  UserListCasePreProblemInput,
  UserUpdateCasePreProblemInput,
  UserUpdateCasePreProblemsInput,
  ApiCasePreProblemDataAccessUserService,
  CasePreProblem,
} from '@case-clinical/api/case-pre-problem/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCasePreProblemFeatureUserResolver {
  constructor(private readonly service: ApiCasePreProblemDataAccessUserService) {}

  @Query(() => [CasePreProblem], { nullable: true })
  userCasePreProblems(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreProblemInput, nullable: true }) input?: UserListCasePreProblemInput,
  ) {
    return this.service.userCasePreProblems(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCasePreProblems(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreProblemInput, nullable: true }) input?: UserListCasePreProblemInput,
  ) {
    return this.service.userCountCasePreProblems(user.id, input)
  }

  @Query(() => [CasePreProblem], { nullable: true })
  userSelectCasePreProblems(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreProblemInput, nullable: true }) input?: UserListCasePreProblemInput,
  ) {
    return this.service.userSelectCasePreProblems(user.id, input)
  }







  @Query(() => CasePreProblem, { nullable: true })
  userCasePreProblem(@CtxUser() user: User, @Args('casePreProblemId') casePreProblemId: string) {
    return this.service.userCasePreProblem(user.id, casePreProblemId)
  }

  @Mutation(() => CasePreProblem, { nullable: true })
  userCreateCasePreProblem(@CtxUser() user: User, @Args('input') input: UserCreateCasePreProblemInput,) {
    return this.service.userCreateCasePreProblem(user.id, input)
  }

  @Mutation(() => CasePreProblem, { nullable: true })
  userUpdateCasePreProblem(
    @CtxUser() user: User,
    @Args('casePreProblemId') casePreProblemId: string,
    @Args('input') input: UserUpdateCasePreProblemInput,
  ) {
    return this.service.userUpdateCasePreProblem(user.id, casePreProblemId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCasePreProblems(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCasePreProblemsInput,
  ) {
    return this.service.userUpdateCasePreProblems(user.id, input)
  }

  @Mutation(() => CasePreProblem, { nullable: true })
  userDeleteCasePreProblem(@CtxUser() user: User, @Args('casePreProblemId') casePreProblemId: string) {
    return this.service.userDeleteCasePreProblem(user.id, casePreProblemId)
  }
}

