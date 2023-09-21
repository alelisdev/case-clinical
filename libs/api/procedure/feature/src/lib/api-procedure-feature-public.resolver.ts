
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcedureInput,
  ApiProcedureDataAccessPublicService,
  Procedure,
} from '@case-clinical/api/procedure/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcedureFeaturePublicResolver {
  constructor(private readonly service: ApiProcedureDataAccessPublicService) {}
           
  @Query(() => [Procedure], { nullable: true })
  publicProcedures(
    @Args({ name: 'input', type: () => UserListProcedureInput, nullable: true }) input?: UserListProcedureInput,
  ) {
    return this.service.publicProcedures(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcedures(
    @Args({ name: 'input', type: () => UserListProcedureInput, nullable: true }) input?: UserListProcedureInput,
  ) {
    return this.service.publicCountProcedures(input)
  }

  @Query(() => [Procedure], { nullable: true })
  publicSelectProcedures(
    @Args({ name: 'input', type: () => UserListProcedureInput, nullable: true }) input?: UserListProcedureInput,
  ) {
    return this.service.publicSelectProcedures(input)
  }

  @Query(() => Procedure, { nullable: true })
  publicProcedure(@Args('procedureId') procedureId: string) {
    return this.service.publicProcedure(procedureId)
  }
}
