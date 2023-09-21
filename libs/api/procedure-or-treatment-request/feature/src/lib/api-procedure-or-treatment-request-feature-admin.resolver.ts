
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcedureOrTreatmentRequestInput,
  AdminListProcedureOrTreatmentRequestInput,
  AdminUpdateProcedureOrTreatmentRequestInput,
  ApiProcedureOrTreatmentRequestDataAccessAdminService,
  ProcedureOrTreatmentRequest
} from '@case-clinical/api/procedure-or-treatment-request/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcedureOrTreatmentRequestFeatureAdminResolver {
  constructor(private readonly service: ApiProcedureOrTreatmentRequestDataAccessAdminService) {}

  @Query(() => [ProcedureOrTreatmentRequest], { nullable: true })
  adminProcedureOrTreatmentRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureOrTreatmentRequestInput, nullable: true }) input?: AdminListProcedureOrTreatmentRequestInput,
  ) {
    return this.service.adminProcedureOrTreatmentRequests(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcedureOrTreatmentRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureOrTreatmentRequestInput, nullable: true }) input?: AdminListProcedureOrTreatmentRequestInput,
  ) {
    return this.service.adminCountProcedureOrTreatmentRequests(admin.id, input)
  }





  @Query(() => ProcedureOrTreatmentRequest, { nullable: true })
  adminProcedureOrTreatmentRequest(@CtxUser() admin: User, @Args('procedureOrTreatmentRequestId') procedureOrTreatmentRequestId: string) {
    return this.service.adminProcedureOrTreatmentRequest(admin.id, procedureOrTreatmentRequestId)
  }

  @Mutation(() => ProcedureOrTreatmentRequest, { nullable: true })
  adminCreateProcedureOrTreatmentRequest(@CtxUser() admin: User, @Args('input') input: AdminCreateProcedureOrTreatmentRequestInput,) {
    return this.service.adminCreateProcedureOrTreatmentRequest(admin.id, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequest, { nullable: true })
  adminUpdateProcedureOrTreatmentRequest(
    @CtxUser() admin: User,
    @Args('procedureOrTreatmentRequestId') procedureOrTreatmentRequestId: string,
    @Args('input') input: AdminUpdateProcedureOrTreatmentRequestInput,
  ) {
    return this.service.adminUpdateProcedureOrTreatmentRequest(admin.id, procedureOrTreatmentRequestId, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequest, { nullable: true })
  adminDeleteProcedureOrTreatmentRequest(@CtxUser() admin: User, @Args('procedureOrTreatmentRequestId') procedureOrTreatmentRequestId: string) {
    return this.service.adminDeleteProcedureOrTreatmentRequest(admin.id, procedureOrTreatmentRequestId)
  }
}

