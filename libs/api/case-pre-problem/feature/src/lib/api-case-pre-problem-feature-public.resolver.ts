
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCasePreProblemInput,
  ApiCasePreProblemDataAccessPublicService,
  CasePreProblem,
} from '@case-clinical/api/case-pre-problem/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCasePreProblemFeaturePublicResolver {
  constructor(private readonly service: ApiCasePreProblemDataAccessPublicService) {}
           
  @Query(() => [CasePreProblem], { nullable: true })
  publicCasePreProblems(
    @Args({ name: 'input', type: () => UserListCasePreProblemInput, nullable: true }) input?: UserListCasePreProblemInput,
  ) {
    return this.service.publicCasePreProblems(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCasePreProblems(
    @Args({ name: 'input', type: () => UserListCasePreProblemInput, nullable: true }) input?: UserListCasePreProblemInput,
  ) {
    return this.service.publicCountCasePreProblems(input)
  }

  @Query(() => [CasePreProblem], { nullable: true })
  publicSelectCasePreProblems(
    @Args({ name: 'input', type: () => UserListCasePreProblemInput, nullable: true }) input?: UserListCasePreProblemInput,
  ) {
    return this.service.publicSelectCasePreProblems(input)
  }

  @Query(() => CasePreProblem, { nullable: true })
  publicCasePreProblem(@Args('casePreProblemId') casePreProblemId: string) {
    return this.service.publicCasePreProblem(casePreProblemId)
  }
}
