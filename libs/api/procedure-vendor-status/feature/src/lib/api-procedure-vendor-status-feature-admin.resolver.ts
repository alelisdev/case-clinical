
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcedureVendorStatusInput,
  AdminListProcedureVendorStatusInput,
  AdminUpdateProcedureVendorStatusInput,
  ApiProcedureVendorStatusDataAccessAdminService,
  ProcedureVendorStatus
} from '@case-clinical/api/procedure-vendor-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcedureVendorStatusFeatureAdminResolver {
  constructor(private readonly service: ApiProcedureVendorStatusDataAccessAdminService) {}

  @Query(() => [ProcedureVendorStatus], { nullable: true })
  adminProcedureVendorStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureVendorStatusInput, nullable: true }) input?: AdminListProcedureVendorStatusInput,
  ) {
    return this.service.adminProcedureVendorStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcedureVendorStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureVendorStatusInput, nullable: true }) input?: AdminListProcedureVendorStatusInput,
  ) {
    return this.service.adminCountProcedureVendorStatuses(admin.id, input)
  }





  @Query(() => ProcedureVendorStatus, { nullable: true })
  adminProcedureVendorStatus(@CtxUser() admin: User, @Args('procedureVendorStatusId') procedureVendorStatusId: string) {
    return this.service.adminProcedureVendorStatus(admin.id, procedureVendorStatusId)
  }

  @Mutation(() => ProcedureVendorStatus, { nullable: true })
  adminCreateProcedureVendorStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateProcedureVendorStatusInput,) {
    return this.service.adminCreateProcedureVendorStatus(admin.id, input)
  }

  @Mutation(() => ProcedureVendorStatus, { nullable: true })
  adminUpdateProcedureVendorStatus(
    @CtxUser() admin: User,
    @Args('procedureVendorStatusId') procedureVendorStatusId: string,
    @Args('input') input: AdminUpdateProcedureVendorStatusInput,
  ) {
    return this.service.adminUpdateProcedureVendorStatus(admin.id, procedureVendorStatusId, input)
  }

  @Mutation(() => ProcedureVendorStatus, { nullable: true })
  adminDeleteProcedureVendorStatus(@CtxUser() admin: User, @Args('procedureVendorStatusId') procedureVendorStatusId: string) {
    return this.service.adminDeleteProcedureVendorStatus(admin.id, procedureVendorStatusId)
  }
}

