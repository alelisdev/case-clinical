
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCasePreInjuryInput,
  ApiCasePreInjuryDataAccessPublicService,
  CasePreInjury,
} from '@case-clinical/api/case-pre-injury/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCasePreInjuryFeaturePublicResolver {
  constructor(private readonly service: ApiCasePreInjuryDataAccessPublicService) {}
           
  @Query(() => [CasePreInjury], { nullable: true })
  publicCasePreInjuries(
    @Args({ name: 'input', type: () => UserListCasePreInjuryInput, nullable: true }) input?: UserListCasePreInjuryInput,
  ) {
    return this.service.publicCasePreInjuries(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCasePreInjuries(
    @Args({ name: 'input', type: () => UserListCasePreInjuryInput, nullable: true }) input?: UserListCasePreInjuryInput,
  ) {
    return this.service.publicCountCasePreInjuries(input)
  }

  @Query(() => [CasePreInjury], { nullable: true })
  publicSelectCasePreInjuries(
    @Args({ name: 'input', type: () => UserListCasePreInjuryInput, nullable: true }) input?: UserListCasePreInjuryInput,
  ) {
    return this.service.publicSelectCasePreInjuries(input)
  }

  @Query(() => CasePreInjury, { nullable: true })
  publicCasePreInjury(@Args('casePreInjuryId') casePreInjuryId: string) {
    return this.service.publicCasePreInjury(casePreInjuryId)
  }
}
