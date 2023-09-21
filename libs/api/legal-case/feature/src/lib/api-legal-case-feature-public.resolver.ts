
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListLegalCaseInput,
  ApiLegalCaseDataAccessPublicService,
  LegalCase,
} from '@case-clinical/api/legal-case/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiLegalCaseFeaturePublicResolver {
  constructor(private readonly service: ApiLegalCaseDataAccessPublicService) {}
           
  @Query(() => [LegalCase], { nullable: true })
  publicLegalCases(
    @Args({ name: 'input', type: () => UserListLegalCaseInput, nullable: true }) input?: UserListLegalCaseInput,
  ) {
    return this.service.publicLegalCases(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountLegalCases(
    @Args({ name: 'input', type: () => UserListLegalCaseInput, nullable: true }) input?: UserListLegalCaseInput,
  ) {
    return this.service.publicCountLegalCases(input)
  }

  @Query(() => [LegalCase], { nullable: true })
  publicSelectLegalCases(
    @Args({ name: 'input', type: () => UserListLegalCaseInput, nullable: true }) input?: UserListLegalCaseInput,
  ) {
    return this.service.publicSelectLegalCases(input)
  }

  @Query(() => LegalCase, { nullable: true })
  publicLegalCase(@Args('legalCaseId') legalCaseId: string) {
    return this.service.publicLegalCase(legalCaseId)
  }
}
