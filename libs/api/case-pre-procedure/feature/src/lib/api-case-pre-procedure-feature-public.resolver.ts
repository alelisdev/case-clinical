
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCasePreProcedureInput,
  ApiCasePreProcedureDataAccessPublicService,
  CasePreProcedure,
} from '@case-clinical/api/case-pre-procedure/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCasePreProcedureFeaturePublicResolver {
  constructor(private readonly service: ApiCasePreProcedureDataAccessPublicService) {}
           
  @Query(() => [CasePreProcedure], { nullable: true })
  publicCasePreProcedures(
    @Args({ name: 'input', type: () => UserListCasePreProcedureInput, nullable: true }) input?: UserListCasePreProcedureInput,
  ) {
    return this.service.publicCasePreProcedures(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCasePreProcedures(
    @Args({ name: 'input', type: () => UserListCasePreProcedureInput, nullable: true }) input?: UserListCasePreProcedureInput,
  ) {
    return this.service.publicCountCasePreProcedures(input)
  }

  @Query(() => [CasePreProcedure], { nullable: true })
  publicSelectCasePreProcedures(
    @Args({ name: 'input', type: () => UserListCasePreProcedureInput, nullable: true }) input?: UserListCasePreProcedureInput,
  ) {
    return this.service.publicSelectCasePreProcedures(input)
  }

  @Query(() => CasePreProcedure, { nullable: true })
  publicCasePreProcedure(@Args('casePreProcedureId') casePreProcedureId: string) {
    return this.service.publicCasePreProcedure(casePreProcedureId)
  }
}
