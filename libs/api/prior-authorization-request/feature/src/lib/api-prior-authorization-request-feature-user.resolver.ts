
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePriorAuthorizationRequestInput,
  UserListPriorAuthorizationRequestInput,
  UserUpdatePriorAuthorizationRequestInput,
  UserUpdatePriorAuthorizationRequestsInput,
  ApiPriorAuthorizationRequestDataAccessUserService,
  PriorAuthorizationRequest,
} from '@case-clinical/api/prior-authorization-request/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListProcedureSiteInput, ProcedureSite } from '@case-clinical/api/procedure-site/data-access'
import { UserListSurgicalPositionInput, SurgicalPosition } from '@case-clinical/api/surgical-position/data-access'
import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { UserListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { UserListVisitKindInput, VisitKind } from '@case-clinical/api/visit-kind/data-access'
import { UserListGuidelineUsedInput, GuidelineUsed } from '@case-clinical/api/guideline-used/data-access'
import { UserListAuthorizationKindInput, AuthorizationKind } from '@case-clinical/api/authorization-kind/data-access'
import { UserListAuthorizationStatusInput, AuthorizationStatus } from '@case-clinical/api/authorization-status/data-access'
import { UserListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { UserListCaseProcedureInput, CaseProcedure } from '@case-clinical/api/case-procedure/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPriorAuthorizationRequestFeatureUserResolver {
  constructor(private readonly service: ApiPriorAuthorizationRequestDataAccessUserService) {}

  @Query(() => [PriorAuthorizationRequest], { nullable: true })
  userPriorAuthorizationRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationRequestInput, nullable: true }) input?: UserListPriorAuthorizationRequestInput,
  ) {
    return this.service.userPriorAuthorizationRequests(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPriorAuthorizationRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationRequestInput, nullable: true }) input?: UserListPriorAuthorizationRequestInput,
  ) {
    return this.service.userCountPriorAuthorizationRequests(user.id, input)
  }

  @Query(() => [PriorAuthorizationRequest], { nullable: true })
  userSelectPriorAuthorizationRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationRequestInput, nullable: true }) input?: UserListPriorAuthorizationRequestInput,
  ) {
    return this.service.userSelectPriorAuthorizationRequests(user.id, input)
  }







  @Query(() => PriorAuthorizationRequest, { nullable: true })
  userPriorAuthorizationRequest(@CtxUser() user: User, @Args('priorAuthorizationRequestId') priorAuthorizationRequestId: string) {
    return this.service.userPriorAuthorizationRequest(user.id, priorAuthorizationRequestId)
  }

  @Mutation(() => PriorAuthorizationRequest, { nullable: true })
  userCreatePriorAuthorizationRequest(@CtxUser() user: User, @Args('input') input: UserCreatePriorAuthorizationRequestInput,) {
    return this.service.userCreatePriorAuthorizationRequest(user.id, input)
  }

  @Mutation(() => PriorAuthorizationRequest, { nullable: true })
  userUpdatePriorAuthorizationRequest(
    @CtxUser() user: User,
    @Args('priorAuthorizationRequestId') priorAuthorizationRequestId: string,
    @Args('input') input: UserUpdatePriorAuthorizationRequestInput,
  ) {
    return this.service.userUpdatePriorAuthorizationRequest(user.id, priorAuthorizationRequestId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePriorAuthorizationRequests(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePriorAuthorizationRequestsInput,
  ) {
    return this.service.userUpdatePriorAuthorizationRequests(user.id, input)
  }

  @Mutation(() => PriorAuthorizationRequest, { nullable: true })
  userDeletePriorAuthorizationRequest(@CtxUser() user: User, @Args('priorAuthorizationRequestId') priorAuthorizationRequestId: string) {
    return this.service.userDeletePriorAuthorizationRequest(user.id, priorAuthorizationRequestId)
  }
}

