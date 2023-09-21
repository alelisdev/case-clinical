
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCasePreAccidentInput,
  ApiCasePreAccidentDataAccessPublicService,
  CasePreAccident,
} from '@case-clinical/api/case-pre-accident/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCasePreAccidentFeaturePublicResolver {
  constructor(private readonly service: ApiCasePreAccidentDataAccessPublicService) {}
           
  @Query(() => [CasePreAccident], { nullable: true })
  publicCasePreAccidents(
    @Args({ name: 'input', type: () => UserListCasePreAccidentInput, nullable: true }) input?: UserListCasePreAccidentInput,
  ) {
    return this.service.publicCasePreAccidents(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCasePreAccidents(
    @Args({ name: 'input', type: () => UserListCasePreAccidentInput, nullable: true }) input?: UserListCasePreAccidentInput,
  ) {
    return this.service.publicCountCasePreAccidents(input)
  }

  @Query(() => [CasePreAccident], { nullable: true })
  publicSelectCasePreAccidents(
    @Args({ name: 'input', type: () => UserListCasePreAccidentInput, nullable: true }) input?: UserListCasePreAccidentInput,
  ) {
    return this.service.publicSelectCasePreAccidents(input)
  }

  @Query(() => CasePreAccident, { nullable: true })
  publicCasePreAccident(@Args('casePreAccidentId') casePreAccidentId: string) {
    return this.service.publicCasePreAccident(casePreAccidentId)
  }
}
