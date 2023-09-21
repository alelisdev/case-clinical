
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCaseTypeInput,
  ApiCaseTypeDataAccessPublicService,
  CaseType,
} from '@case-clinical/api/case-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCaseTypeFeaturePublicResolver {
  constructor(private readonly service: ApiCaseTypeDataAccessPublicService) {}
           
  @Query(() => [CaseType], { nullable: true })
  publicCaseTypes(
    @Args({ name: 'input', type: () => UserListCaseTypeInput, nullable: true }) input?: UserListCaseTypeInput,
  ) {
    return this.service.publicCaseTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCaseTypes(
    @Args({ name: 'input', type: () => UserListCaseTypeInput, nullable: true }) input?: UserListCaseTypeInput,
  ) {
    return this.service.publicCountCaseTypes(input)
  }

  @Query(() => [CaseType], { nullable: true })
  publicSelectCaseTypes(
    @Args({ name: 'input', type: () => UserListCaseTypeInput, nullable: true }) input?: UserListCaseTypeInput,
  ) {
    return this.service.publicSelectCaseTypes(input)
  }

  @Query(() => CaseType, { nullable: true })
  publicCaseType(@Args('caseTypeId') caseTypeId: string) {
    return this.service.publicCaseType(caseTypeId)
  }
}
