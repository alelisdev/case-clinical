
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcedureOrTreatmentRequestAuthorizationInput,
  AdminListProcedureOrTreatmentRequestAuthorizationInput,
  AdminUpdateProcedureOrTreatmentRequestAuthorizationInput,
  ApiProcedureOrTreatmentRequestAuthorizationDataAccessAdminService,
  ProcedureOrTreatmentRequestAuthorization
} from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListAuthorizationInput, Authorization } from '@case-clinical/api/authorization/data-access'
import { AdminListProcedureOrTreatmentRequestInput, ProcedureOrTreatmentRequest } from '@case-clinical/api/procedure-or-treatment-request/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcedureOrTreatmentRequestAuthorizationFeatureAdminResolver {
  constructor(private readonly service: ApiProcedureOrTreatmentRequestAuthorizationDataAccessAdminService) {}

  @Query(() => [ProcedureOrTreatmentRequestAuthorization], { nullable: true })
  adminProcedureOrTreatmentRequestAuthorizations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureOrTreatmentRequestAuthorizationInput, nullable: true }) input?: AdminListProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.adminProcedureOrTreatmentRequestAuthorizations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcedureOrTreatmentRequestAuthorizations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureOrTreatmentRequestAuthorizationInput, nullable: true }) input?: AdminListProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.adminCountProcedureOrTreatmentRequestAuthorizations(admin.id, input)
  }





  @Query(() => ProcedureOrTreatmentRequestAuthorization, { nullable: true })
  adminProcedureOrTreatmentRequestAuthorization(@CtxUser() admin: User, @Args('procedureOrTreatmentRequestAuthorizationId') procedureOrTreatmentRequestAuthorizationId: string) {
    return this.service.adminProcedureOrTreatmentRequestAuthorization(admin.id, procedureOrTreatmentRequestAuthorizationId)
  }

  @Mutation(() => ProcedureOrTreatmentRequestAuthorization, { nullable: true })
  adminCreateProcedureOrTreatmentRequestAuthorization(@CtxUser() admin: User, @Args('input') input: AdminCreateProcedureOrTreatmentRequestAuthorizationInput,) {
    return this.service.adminCreateProcedureOrTreatmentRequestAuthorization(admin.id, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequestAuthorization, { nullable: true })
  adminUpdateProcedureOrTreatmentRequestAuthorization(
    @CtxUser() admin: User,
    @Args('procedureOrTreatmentRequestAuthorizationId') procedureOrTreatmentRequestAuthorizationId: string,
    @Args('input') input: AdminUpdateProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.adminUpdateProcedureOrTreatmentRequestAuthorization(admin.id, procedureOrTreatmentRequestAuthorizationId, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequestAuthorization, { nullable: true })
  adminDeleteProcedureOrTreatmentRequestAuthorization(@CtxUser() admin: User, @Args('procedureOrTreatmentRequestAuthorizationId') procedureOrTreatmentRequestAuthorizationId: string) {
    return this.service.adminDeleteProcedureOrTreatmentRequestAuthorization(admin.id, procedureOrTreatmentRequestAuthorizationId)
  }
}

