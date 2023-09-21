
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcedureStatusInput,
  AdminListProcedureStatusInput,
  AdminUpdateProcedureStatusInput,
  ApiProcedureStatusDataAccessAdminService,
  ProcedureStatus
} from '@case-clinical/api/procedure-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcedureStatusFeatureAdminResolver {
  constructor(private readonly service: ApiProcedureStatusDataAccessAdminService) {}

  @Query(() => [ProcedureStatus], { nullable: true })
  adminProcedureStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureStatusInput, nullable: true }) input?: AdminListProcedureStatusInput,
  ) {
    return this.service.adminProcedureStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcedureStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureStatusInput, nullable: true }) input?: AdminListProcedureStatusInput,
  ) {
    return this.service.adminCountProcedureStatuses(admin.id, input)
  }





  @Query(() => ProcedureStatus, { nullable: true })
  adminProcedureStatus(@CtxUser() admin: User, @Args('procedureStatusId') procedureStatusId: string) {
    return this.service.adminProcedureStatus(admin.id, procedureStatusId)
  }

  @Mutation(() => ProcedureStatus, { nullable: true })
  adminCreateProcedureStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateProcedureStatusInput,) {
    return this.service.adminCreateProcedureStatus(admin.id, input)
  }

  @Mutation(() => ProcedureStatus, { nullable: true })
  adminUpdateProcedureStatus(
    @CtxUser() admin: User,
    @Args('procedureStatusId') procedureStatusId: string,
    @Args('input') input: AdminUpdateProcedureStatusInput,
  ) {
    return this.service.adminUpdateProcedureStatus(admin.id, procedureStatusId, input)
  }

  @Mutation(() => ProcedureStatus, { nullable: true })
  adminDeleteProcedureStatus(@CtxUser() admin: User, @Args('procedureStatusId') procedureStatusId: string) {
    return this.service.adminDeleteProcedureStatus(admin.id, procedureStatusId)
  }
}

