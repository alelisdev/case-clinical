
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcedureTypeInput,
  ApiProcedureTypeDataAccessPublicService,
  ProcedureType,
} from '@case-clinical/api/procedure-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcedureTypeFeaturePublicResolver {
  constructor(private readonly service: ApiProcedureTypeDataAccessPublicService) {}
           
  @Query(() => [ProcedureType], { nullable: true })
  publicProcedureTypes(
    @Args({ name: 'input', type: () => UserListProcedureTypeInput, nullable: true }) input?: UserListProcedureTypeInput,
  ) {
    return this.service.publicProcedureTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcedureTypes(
    @Args({ name: 'input', type: () => UserListProcedureTypeInput, nullable: true }) input?: UserListProcedureTypeInput,
  ) {
    return this.service.publicCountProcedureTypes(input)
  }

  @Query(() => [ProcedureType], { nullable: true })
  publicSelectProcedureTypes(
    @Args({ name: 'input', type: () => UserListProcedureTypeInput, nullable: true }) input?: UserListProcedureTypeInput,
  ) {
    return this.service.publicSelectProcedureTypes(input)
  }

  @Query(() => ProcedureType, { nullable: true })
  publicProcedureType(@Args('procedureTypeId') procedureTypeId: string) {
    return this.service.publicProcedureType(procedureTypeId)
  }
}
