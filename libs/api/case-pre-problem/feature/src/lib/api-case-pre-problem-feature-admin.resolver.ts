
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCasePreProblemInput,
  AdminListCasePreProblemInput,
  AdminUpdateCasePreProblemInput,
  ApiCasePreProblemDataAccessAdminService,
  CasePreProblem
} from '@case-clinical/api/case-pre-problem/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCasePreProblemFeatureAdminResolver {
  constructor(private readonly service: ApiCasePreProblemDataAccessAdminService) {}

  @Query(() => [CasePreProblem], { nullable: true })
  adminCasePreProblems(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCasePreProblemInput, nullable: true }) input?: AdminListCasePreProblemInput,
  ) {
    return this.service.adminCasePreProblems(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCasePreProblems(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCasePreProblemInput, nullable: true }) input?: AdminListCasePreProblemInput,
  ) {
    return this.service.adminCountCasePreProblems(admin.id, input)
  }





  @Query(() => CasePreProblem, { nullable: true })
  adminCasePreProblem(@CtxUser() admin: User, @Args('casePreProblemId') casePreProblemId: string) {
    return this.service.adminCasePreProblem(admin.id, casePreProblemId)
  }

  @Mutation(() => CasePreProblem, { nullable: true })
  adminCreateCasePreProblem(@CtxUser() admin: User, @Args('input') input: AdminCreateCasePreProblemInput,) {
    return this.service.adminCreateCasePreProblem(admin.id, input)
  }

  @Mutation(() => CasePreProblem, { nullable: true })
  adminUpdateCasePreProblem(
    @CtxUser() admin: User,
    @Args('casePreProblemId') casePreProblemId: string,
    @Args('input') input: AdminUpdateCasePreProblemInput,
  ) {
    return this.service.adminUpdateCasePreProblem(admin.id, casePreProblemId, input)
  }

  @Mutation(() => CasePreProblem, { nullable: true })
  adminDeleteCasePreProblem(@CtxUser() admin: User, @Args('casePreProblemId') casePreProblemId: string) {
    return this.service.adminDeleteCasePreProblem(admin.id, casePreProblemId)
  }
}

