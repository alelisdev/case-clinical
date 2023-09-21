
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcedureVendorInput,
  ApiProcedureVendorDataAccessPublicService,
  ProcedureVendor,
} from '@case-clinical/api/procedure-vendor/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcedureVendorFeaturePublicResolver {
  constructor(private readonly service: ApiProcedureVendorDataAccessPublicService) {}
           
  @Query(() => [ProcedureVendor], { nullable: true })
  publicProcedureVendors(
    @Args({ name: 'input', type: () => UserListProcedureVendorInput, nullable: true }) input?: UserListProcedureVendorInput,
  ) {
    return this.service.publicProcedureVendors(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcedureVendors(
    @Args({ name: 'input', type: () => UserListProcedureVendorInput, nullable: true }) input?: UserListProcedureVendorInput,
  ) {
    return this.service.publicCountProcedureVendors(input)
  }

  @Query(() => [ProcedureVendor], { nullable: true })
  publicSelectProcedureVendors(
    @Args({ name: 'input', type: () => UserListProcedureVendorInput, nullable: true }) input?: UserListProcedureVendorInput,
  ) {
    return this.service.publicSelectProcedureVendors(input)
  }

  @Query(() => ProcedureVendor, { nullable: true })
  publicProcedureVendor(@Args('procedureVendorId') procedureVendorId: string) {
    return this.service.publicProcedureVendor(procedureVendorId)
  }
}
