
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcedureStatusInput,
  ApiProcedureStatusDataAccessPublicService,
  ProcedureStatus,
} from '@case-clinical/api/procedure-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcedureStatusFeaturePublicResolver {
  constructor(private readonly service: ApiProcedureStatusDataAccessPublicService) {}

  @Query(() => [ProcedureStatus], { nullable: true })
  publicProcedureStatuses(
    @Args({ name: 'input', type: () => UserListProcedureStatusInput, nullable: true }) input?: UserListProcedureStatusInput,
  ) {
    return this.service.publicProcedureStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcedureStatuses(
    @Args({ name: 'input', type: () => UserListProcedureStatusInput, nullable: true }) input?: UserListProcedureStatusInput,
  ) {
    return this.service.publicCountProcedureStatuses(input)
  }

  @Query(() => [ProcedureStatus], { nullable: true })
  publicSelectProcedureStatuses(
    @Args({ name: 'input', type: () => UserListProcedureStatusInput, nullable: true }) input?: UserListProcedureStatusInput,
  ) {
    return this.service.publicSelectProcedureStatuses(input)
  }

  @Query(() => ProcedureStatus, { nullable: true })
  publicProcedureStatus(@Args('procedureStatusId') procedureStatusId: string) {
    return this.service.publicProcedureStatus(procedureStatusId)
  }
}
