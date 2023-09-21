
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCaseProgressStatusInput,
  ApiCaseProgressStatusDataAccessPublicService,
  CaseProgressStatus,
} from '@case-clinical/api/case-progress-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCaseProgressStatusFeaturePublicResolver {
  constructor(private readonly service: ApiCaseProgressStatusDataAccessPublicService) {}
           
  @Query(() => [CaseProgressStatus], { nullable: true })
  publicCaseProgressStatuses(
    @Args({ name: 'input', type: () => UserListCaseProgressStatusInput, nullable: true }) input?: UserListCaseProgressStatusInput,
  ) {
    return this.service.publicCaseProgressStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCaseProgressStatuses(
    @Args({ name: 'input', type: () => UserListCaseProgressStatusInput, nullable: true }) input?: UserListCaseProgressStatusInput,
  ) {
    return this.service.publicCountCaseProgressStatuses(input)
  }

  @Query(() => [CaseProgressStatus], { nullable: true })
  publicSelectCaseProgressStatuses(
    @Args({ name: 'input', type: () => UserListCaseProgressStatusInput, nullable: true }) input?: UserListCaseProgressStatusInput,
  ) {
    return this.service.publicSelectCaseProgressStatuses(input)
  }

  @Query(() => CaseProgressStatus, { nullable: true })
  publicCaseProgressStatus(@Args('caseProgressStatusId') caseProgressStatusId: string) {
    return this.service.publicCaseProgressStatus(caseProgressStatusId)
  }
}
