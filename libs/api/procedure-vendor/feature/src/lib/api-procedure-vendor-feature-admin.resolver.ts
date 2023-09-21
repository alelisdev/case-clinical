
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcedureVendorInput,
  AdminListProcedureVendorInput,
  AdminUpdateProcedureVendorInput,
  ApiProcedureVendorDataAccessAdminService,
  ProcedureVendor
} from '@case-clinical/api/procedure-vendor/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListCaseProcedureInput, CaseProcedure } from '@case-clinical/api/case-procedure/data-access'
import { AdminListContractInput, Contract } from '@case-clinical/api/contract/data-access'
import { AdminListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'
import { AdminListProcedureVendorStatusInput, ProcedureVendorStatus } from '@case-clinical/api/procedure-vendor-status/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcedureVendorFeatureAdminResolver {
  constructor(private readonly service: ApiProcedureVendorDataAccessAdminService) {}

  @Query(() => [ProcedureVendor], { nullable: true })
  adminProcedureVendors(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureVendorInput, nullable: true }) input?: AdminListProcedureVendorInput,
  ) {
    return this.service.adminProcedureVendors(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcedureVendors(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureVendorInput, nullable: true }) input?: AdminListProcedureVendorInput,
  ) {
    return this.service.adminCountProcedureVendors(admin.id, input)
  }





  @Query(() => ProcedureVendor, { nullable: true })
  adminProcedureVendor(@CtxUser() admin: User, @Args('procedureVendorId') procedureVendorId: string) {
    return this.service.adminProcedureVendor(admin.id, procedureVendorId)
  }

  @Mutation(() => ProcedureVendor, { nullable: true })
  adminCreateProcedureVendor(@CtxUser() admin: User, @Args('input') input: AdminCreateProcedureVendorInput,) {
    return this.service.adminCreateProcedureVendor(admin.id, input)
  }

  @Mutation(() => ProcedureVendor, { nullable: true })
  adminUpdateProcedureVendor(
    @CtxUser() admin: User,
    @Args('procedureVendorId') procedureVendorId: string,
    @Args('input') input: AdminUpdateProcedureVendorInput,
  ) {
    return this.service.adminUpdateProcedureVendor(admin.id, procedureVendorId, input)
  }

  @Mutation(() => ProcedureVendor, { nullable: true })
  adminDeleteProcedureVendor(@CtxUser() admin: User, @Args('procedureVendorId') procedureVendorId: string) {
    return this.service.adminDeleteProcedureVendor(admin.id, procedureVendorId)
  }
}

