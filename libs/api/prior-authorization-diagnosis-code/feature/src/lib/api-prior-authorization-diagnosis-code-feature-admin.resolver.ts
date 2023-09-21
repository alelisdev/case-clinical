
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriorAuthorizationDiagnosisCodeInput,
  AdminListPriorAuthorizationDiagnosisCodeInput,
  AdminUpdatePriorAuthorizationDiagnosisCodeInput,
  ApiPriorAuthorizationDiagnosisCodeDataAccessAdminService,
  PriorAuthorizationDiagnosisCode
} from '@case-clinical/api/prior-authorization-diagnosis-code/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListDiagnosisCodeInput, DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'
import { AdminListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPriorAuthorizationDiagnosisCodeFeatureAdminResolver {
  constructor(private readonly service: ApiPriorAuthorizationDiagnosisCodeDataAccessAdminService) {}

  @Query(() => [PriorAuthorizationDiagnosisCode], { nullable: true })
  adminPriorAuthorizationDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationDiagnosisCodeInput, nullable: true }) input?: AdminListPriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.adminPriorAuthorizationDiagnosisCodes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPriorAuthorizationDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationDiagnosisCodeInput, nullable: true }) input?: AdminListPriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.adminCountPriorAuthorizationDiagnosisCodes(admin.id, input)
  }





  @Query(() => PriorAuthorizationDiagnosisCode, { nullable: true })
  adminPriorAuthorizationDiagnosisCode(@CtxUser() admin: User, @Args('priorAuthorizationDiagnosisCodeId') priorAuthorizationDiagnosisCodeId: string) {
    return this.service.adminPriorAuthorizationDiagnosisCode(admin.id, priorAuthorizationDiagnosisCodeId)
  }

  @Mutation(() => PriorAuthorizationDiagnosisCode, { nullable: true })
  adminCreatePriorAuthorizationDiagnosisCode(@CtxUser() admin: User, @Args('input') input: AdminCreatePriorAuthorizationDiagnosisCodeInput,) {
    return this.service.adminCreatePriorAuthorizationDiagnosisCode(admin.id, input)
  }

  @Mutation(() => PriorAuthorizationDiagnosisCode, { nullable: true })
  adminUpdatePriorAuthorizationDiagnosisCode(
    @CtxUser() admin: User,
    @Args('priorAuthorizationDiagnosisCodeId') priorAuthorizationDiagnosisCodeId: string,
    @Args('input') input: AdminUpdatePriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.adminUpdatePriorAuthorizationDiagnosisCode(admin.id, priorAuthorizationDiagnosisCodeId, input)
  }

  @Mutation(() => PriorAuthorizationDiagnosisCode, { nullable: true })
  adminDeletePriorAuthorizationDiagnosisCode(@CtxUser() admin: User, @Args('priorAuthorizationDiagnosisCodeId') priorAuthorizationDiagnosisCodeId: string) {
    return this.service.adminDeletePriorAuthorizationDiagnosisCode(admin.id, priorAuthorizationDiagnosisCodeId)
  }
}

