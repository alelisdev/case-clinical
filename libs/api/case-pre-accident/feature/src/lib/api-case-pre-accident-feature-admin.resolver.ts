
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCasePreAccidentInput,
  AdminListCasePreAccidentInput,
  AdminUpdateCasePreAccidentInput,
  ApiCasePreAccidentDataAccessAdminService,
  CasePreAccident
} from '@case-clinical/api/case-pre-accident/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCasePreAccidentFeatureAdminResolver {
  constructor(private readonly service: ApiCasePreAccidentDataAccessAdminService) {}

  @Query(() => [CasePreAccident], { nullable: true })
  adminCasePreAccidents(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCasePreAccidentInput, nullable: true }) input?: AdminListCasePreAccidentInput,
  ) {
    return this.service.adminCasePreAccidents(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCasePreAccidents(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCasePreAccidentInput, nullable: true }) input?: AdminListCasePreAccidentInput,
  ) {
    return this.service.adminCountCasePreAccidents(admin.id, input)
  }





  @Query(() => CasePreAccident, { nullable: true })
  adminCasePreAccident(@CtxUser() admin: User, @Args('casePreAccidentId') casePreAccidentId: string) {
    return this.service.adminCasePreAccident(admin.id, casePreAccidentId)
  }

  @Mutation(() => CasePreAccident, { nullable: true })
  adminCreateCasePreAccident(@CtxUser() admin: User, @Args('input') input: AdminCreateCasePreAccidentInput,) {
    return this.service.adminCreateCasePreAccident(admin.id, input)
  }

  @Mutation(() => CasePreAccident, { nullable: true })
  adminUpdateCasePreAccident(
    @CtxUser() admin: User,
    @Args('casePreAccidentId') casePreAccidentId: string,
    @Args('input') input: AdminUpdateCasePreAccidentInput,
  ) {
    return this.service.adminUpdateCasePreAccident(admin.id, casePreAccidentId, input)
  }

  @Mutation(() => CasePreAccident, { nullable: true })
  adminDeleteCasePreAccident(@CtxUser() admin: User, @Args('casePreAccidentId') casePreAccidentId: string) {
    return this.service.adminDeleteCasePreAccident(admin.id, casePreAccidentId)
  }
}

