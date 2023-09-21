
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCasePreProcedureInput,
  AdminListCasePreProcedureInput,
  AdminUpdateCasePreProcedureInput,
  ApiCasePreProcedureDataAccessAdminService,
  CasePreProcedure
} from '@case-clinical/api/case-pre-procedure/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCasePreProcedureFeatureAdminResolver {
  constructor(private readonly service: ApiCasePreProcedureDataAccessAdminService) {}

  @Query(() => [CasePreProcedure], { nullable: true })
  adminCasePreProcedures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCasePreProcedureInput, nullable: true }) input?: AdminListCasePreProcedureInput,
  ) {
    return this.service.adminCasePreProcedures(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCasePreProcedures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCasePreProcedureInput, nullable: true }) input?: AdminListCasePreProcedureInput,
  ) {
    return this.service.adminCountCasePreProcedures(admin.id, input)
  }





  @Query(() => CasePreProcedure, { nullable: true })
  adminCasePreProcedure(@CtxUser() admin: User, @Args('casePreProcedureId') casePreProcedureId: string) {
    return this.service.adminCasePreProcedure(admin.id, casePreProcedureId)
  }

  @Mutation(() => CasePreProcedure, { nullable: true })
  adminCreateCasePreProcedure(@CtxUser() admin: User, @Args('input') input: AdminCreateCasePreProcedureInput,) {
    return this.service.adminCreateCasePreProcedure(admin.id, input)
  }

  @Mutation(() => CasePreProcedure, { nullable: true })
  adminUpdateCasePreProcedure(
    @CtxUser() admin: User,
    @Args('casePreProcedureId') casePreProcedureId: string,
    @Args('input') input: AdminUpdateCasePreProcedureInput,
  ) {
    return this.service.adminUpdateCasePreProcedure(admin.id, casePreProcedureId, input)
  }

  @Mutation(() => CasePreProcedure, { nullable: true })
  adminDeleteCasePreProcedure(@CtxUser() admin: User, @Args('casePreProcedureId') casePreProcedureId: string) {
    return this.service.adminDeleteCasePreProcedure(admin.id, casePreProcedureId)
  }
}

