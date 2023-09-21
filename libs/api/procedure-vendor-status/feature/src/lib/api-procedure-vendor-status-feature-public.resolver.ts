
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcedureVendorStatusInput,
  ApiProcedureVendorStatusDataAccessPublicService,
  ProcedureVendorStatus,
} from '@case-clinical/api/procedure-vendor-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcedureVendorStatusFeaturePublicResolver {
  constructor(private readonly service: ApiProcedureVendorStatusDataAccessPublicService) {}
           
  @Query(() => [ProcedureVendorStatus], { nullable: true })
  publicProcedureVendorStatuses(
    @Args({ name: 'input', type: () => UserListProcedureVendorStatusInput, nullable: true }) input?: UserListProcedureVendorStatusInput,
  ) {
    return this.service.publicProcedureVendorStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcedureVendorStatuses(
    @Args({ name: 'input', type: () => UserListProcedureVendorStatusInput, nullable: true }) input?: UserListProcedureVendorStatusInput,
  ) {
    return this.service.publicCountProcedureVendorStatuses(input)
  }

  @Query(() => [ProcedureVendorStatus], { nullable: true })
  publicSelectProcedureVendorStatuses(
    @Args({ name: 'input', type: () => UserListProcedureVendorStatusInput, nullable: true }) input?: UserListProcedureVendorStatusInput,
  ) {
    return this.service.publicSelectProcedureVendorStatuses(input)
  }

  @Query(() => ProcedureVendorStatus, { nullable: true })
  publicProcedureVendorStatus(@Args('procedureVendorStatusId') procedureVendorStatusId: string) {
    return this.service.publicProcedureVendorStatus(procedureVendorStatusId)
  }
}
