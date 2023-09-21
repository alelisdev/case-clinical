
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriorAuthorizationRequestInput,
  AdminListPriorAuthorizationRequestInput,
  AdminUpdatePriorAuthorizationRequestInput,
  ApiPriorAuthorizationRequestDataAccessAdminService,
  PriorAuthorizationRequest
} from '@case-clinical/api/prior-authorization-request/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListProcedureSiteInput, ProcedureSite } from '@case-clinical/api/procedure-site/data-access'
import { AdminListSurgicalPositionInput, SurgicalPosition } from '@case-clinical/api/surgical-position/data-access'
import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { AdminListVisitKindInput, VisitKind } from '@case-clinical/api/visit-kind/data-access'
import { AdminListGuidelineUsedInput, GuidelineUsed } from '@case-clinical/api/guideline-used/data-access'
import { AdminListAuthorizationKindInput, AuthorizationKind } from '@case-clinical/api/authorization-kind/data-access'
import { AdminListAuthorizationStatusInput, AuthorizationStatus } from '@case-clinical/api/authorization-status/data-access'
import { AdminListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { AdminListCaseProcedureInput, CaseProcedure } from '@case-clinical/api/case-procedure/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPriorAuthorizationRequestFeatureAdminResolver {
  constructor(private readonly service: ApiPriorAuthorizationRequestDataAccessAdminService) {}

  @Query(() => [PriorAuthorizationRequest], { nullable: true })
  adminPriorAuthorizationRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationRequestInput, nullable: true }) input?: AdminListPriorAuthorizationRequestInput,
  ) {
    return this.service.adminPriorAuthorizationRequests(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPriorAuthorizationRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationRequestInput, nullable: true }) input?: AdminListPriorAuthorizationRequestInput,
  ) {
    return this.service.adminCountPriorAuthorizationRequests(admin.id, input)
  }





  @Query(() => PriorAuthorizationRequest, { nullable: true })
  adminPriorAuthorizationRequest(@CtxUser() admin: User, @Args('priorAuthorizationRequestId') priorAuthorizationRequestId: string) {
    return this.service.adminPriorAuthorizationRequest(admin.id, priorAuthorizationRequestId)
  }

  @Mutation(() => PriorAuthorizationRequest, { nullable: true })
  adminCreatePriorAuthorizationRequest(@CtxUser() admin: User, @Args('input') input: AdminCreatePriorAuthorizationRequestInput,) {
    return this.service.adminCreatePriorAuthorizationRequest(admin.id, input)
  }

  @Mutation(() => PriorAuthorizationRequest, { nullable: true })
  adminUpdatePriorAuthorizationRequest(
    @CtxUser() admin: User,
    @Args('priorAuthorizationRequestId') priorAuthorizationRequestId: string,
    @Args('input') input: AdminUpdatePriorAuthorizationRequestInput,
  ) {
    return this.service.adminUpdatePriorAuthorizationRequest(admin.id, priorAuthorizationRequestId, input)
  }

  @Mutation(() => PriorAuthorizationRequest, { nullable: true })
  adminDeletePriorAuthorizationRequest(@CtxUser() admin: User, @Args('priorAuthorizationRequestId') priorAuthorizationRequestId: string) {
    return this.service.adminDeletePriorAuthorizationRequest(admin.id, priorAuthorizationRequestId)
  }
}

