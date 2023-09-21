
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateDiagnosisCodeInput,
  AdminListDiagnosisCodeInput,
  AdminUpdateDiagnosisCodeInput,
  ApiDiagnosisCodeDataAccessAdminService,
  DiagnosisCode
} from '@case-clinical/api/diagnosis-code/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiDiagnosisCodeFeatureAdminResolver {
  constructor(private readonly service: ApiDiagnosisCodeDataAccessAdminService) {}

  @Query(() => [DiagnosisCode], { nullable: true })
  adminDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDiagnosisCodeInput, nullable: true }) input?: AdminListDiagnosisCodeInput,
  ) {
    return this.service.adminDiagnosisCodes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDiagnosisCodeInput, nullable: true }) input?: AdminListDiagnosisCodeInput,
  ) {
    return this.service.adminCountDiagnosisCodes(admin.id, input)
  }





  @Query(() => DiagnosisCode, { nullable: true })
  adminDiagnosisCode(@CtxUser() admin: User, @Args('diagnosisCodeId') diagnosisCodeId: string) {
    return this.service.adminDiagnosisCode(admin.id, diagnosisCodeId)
  }

  @Mutation(() => DiagnosisCode, { nullable: true })
  adminCreateDiagnosisCode(@CtxUser() admin: User, @Args('input') input: AdminCreateDiagnosisCodeInput,) {
    return this.service.adminCreateDiagnosisCode(admin.id, input)
  }

  @Mutation(() => DiagnosisCode, { nullable: true })
  adminUpdateDiagnosisCode(
    @CtxUser() admin: User,
    @Args('diagnosisCodeId') diagnosisCodeId: string,
    @Args('input') input: AdminUpdateDiagnosisCodeInput,
  ) {
    return this.service.adminUpdateDiagnosisCode(admin.id, diagnosisCodeId, input)
  }

  @Mutation(() => DiagnosisCode, { nullable: true })
  adminDeleteDiagnosisCode(@CtxUser() admin: User, @Args('diagnosisCodeId') diagnosisCodeId: string) {
    return this.service.adminDeleteDiagnosisCode(admin.id, diagnosisCodeId)
  }
}

