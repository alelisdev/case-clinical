
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCaseProcedureInput,
  ApiCaseProcedureDataAccessPublicService,
  CaseProcedure,
} from '@case-clinical/api/case-procedure/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCaseProcedureFeaturePublicResolver {
  constructor(private readonly service: ApiCaseProcedureDataAccessPublicService) {}
           
  @Query(() => [CaseProcedure], { nullable: true })
  publicCaseProcedures(
    @Args({ name: 'input', type: () => UserListCaseProcedureInput, nullable: true }) input?: UserListCaseProcedureInput,
  ) {
    return this.service.publicCaseProcedures(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCaseProcedures(
    @Args({ name: 'input', type: () => UserListCaseProcedureInput, nullable: true }) input?: UserListCaseProcedureInput,
  ) {
    return this.service.publicCountCaseProcedures(input)
  }

  @Query(() => [CaseProcedure], { nullable: true })
  publicSelectCaseProcedures(
    @Args({ name: 'input', type: () => UserListCaseProcedureInput, nullable: true }) input?: UserListCaseProcedureInput,
  ) {
    return this.service.publicSelectCaseProcedures(input)
  }

  @Query(() => CaseProcedure, { nullable: true })
  publicCaseProcedure(@Args('caseProcedureId') caseProcedureId: string) {
    return this.service.publicCaseProcedure(caseProcedureId)
  }
}
