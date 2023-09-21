
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAuthorizationDiagnosisCodeInput,
  AdminListAuthorizationDiagnosisCodeInput,
  AdminUpdateAuthorizationDiagnosisCodeInput,
  ApiAuthorizationDiagnosisCodeDataAccessAdminService,
  AuthorizationDiagnosisCode
} from '@case-clinical/api/authorization-diagnosis-code/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListDiagnosisCodeInput, DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'
import { AdminListAuthorizationInput, Authorization } from '@case-clinical/api/authorization/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAuthorizationDiagnosisCodeFeatureAdminResolver {
  constructor(private readonly service: ApiAuthorizationDiagnosisCodeDataAccessAdminService) {}

  @Query(() => [AuthorizationDiagnosisCode], { nullable: true })
  adminAuthorizationDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationDiagnosisCodeInput, nullable: true }) input?: AdminListAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.adminAuthorizationDiagnosisCodes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAuthorizationDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationDiagnosisCodeInput, nullable: true }) input?: AdminListAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.adminCountAuthorizationDiagnosisCodes(admin.id, input)
  }





  @Query(() => AuthorizationDiagnosisCode, { nullable: true })
  adminAuthorizationDiagnosisCode(@CtxUser() admin: User, @Args('authorizationDiagnosisCodeId') authorizationDiagnosisCodeId: string) {
    return this.service.adminAuthorizationDiagnosisCode(admin.id, authorizationDiagnosisCodeId)
  }

  @Mutation(() => AuthorizationDiagnosisCode, { nullable: true })
  adminCreateAuthorizationDiagnosisCode(@CtxUser() admin: User, @Args('input') input: AdminCreateAuthorizationDiagnosisCodeInput,) {
    return this.service.adminCreateAuthorizationDiagnosisCode(admin.id, input)
  }

  @Mutation(() => AuthorizationDiagnosisCode, { nullable: true })
  adminUpdateAuthorizationDiagnosisCode(
    @CtxUser() admin: User,
    @Args('authorizationDiagnosisCodeId') authorizationDiagnosisCodeId: string,
    @Args('input') input: AdminUpdateAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.adminUpdateAuthorizationDiagnosisCode(admin.id, authorizationDiagnosisCodeId, input)
  }

  @Mutation(() => AuthorizationDiagnosisCode, { nullable: true })
  adminDeleteAuthorizationDiagnosisCode(@CtxUser() admin: User, @Args('authorizationDiagnosisCodeId') authorizationDiagnosisCodeId: string) {
    return this.service.adminDeleteAuthorizationDiagnosisCode(admin.id, authorizationDiagnosisCodeId)
  }
}

