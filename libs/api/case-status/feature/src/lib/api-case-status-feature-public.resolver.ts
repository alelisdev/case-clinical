
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCaseStatusInput,
  ApiCaseStatusDataAccessPublicService,
  CaseStatus,
} from '@case-clinical/api/case-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCaseStatusFeaturePublicResolver {
  constructor(private readonly service: ApiCaseStatusDataAccessPublicService) {}
           
  @Query(() => [CaseStatus], { nullable: true })
  publicCaseStatuses(
    @Args({ name: 'input', type: () => UserListCaseStatusInput, nullable: true }) input?: UserListCaseStatusInput,
  ) {
    return this.service.publicCaseStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCaseStatuses(
    @Args({ name: 'input', type: () => UserListCaseStatusInput, nullable: true }) input?: UserListCaseStatusInput,
  ) {
    return this.service.publicCountCaseStatuses(input)
  }

  @Query(() => [CaseStatus], { nullable: true })
  publicSelectCaseStatuses(
    @Args({ name: 'input', type: () => UserListCaseStatusInput, nullable: true }) input?: UserListCaseStatusInput,
  ) {
    return this.service.publicSelectCaseStatuses(input)
  }

  @Query(() => CaseStatus, { nullable: true })
  publicCaseStatus(@Args('caseStatusId') caseStatusId: string) {
    return this.service.publicCaseStatus(caseStatusId)
  }
}
