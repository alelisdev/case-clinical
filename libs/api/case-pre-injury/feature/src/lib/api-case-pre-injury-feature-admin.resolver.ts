
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCasePreInjuryInput,
  AdminListCasePreInjuryInput,
  AdminUpdateCasePreInjuryInput,
  ApiCasePreInjuryDataAccessAdminService,
  CasePreInjury
} from '@case-clinical/api/case-pre-injury/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCasePreInjuryFeatureAdminResolver {
  constructor(private readonly service: ApiCasePreInjuryDataAccessAdminService) {}

  @Query(() => [CasePreInjury], { nullable: true })
  adminCasePreInjuries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCasePreInjuryInput, nullable: true }) input?: AdminListCasePreInjuryInput,
  ) {
    return this.service.adminCasePreInjuries(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCasePreInjuries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCasePreInjuryInput, nullable: true }) input?: AdminListCasePreInjuryInput,
  ) {
    return this.service.adminCountCasePreInjuries(admin.id, input)
  }





  @Query(() => CasePreInjury, { nullable: true })
  adminCasePreInjury(@CtxUser() admin: User, @Args('casePreInjuryId') casePreInjuryId: string) {
    return this.service.adminCasePreInjury(admin.id, casePreInjuryId)
  }

  @Mutation(() => CasePreInjury, { nullable: true })
  adminCreateCasePreInjury(@CtxUser() admin: User, @Args('input') input: AdminCreateCasePreInjuryInput,) {
    return this.service.adminCreateCasePreInjury(admin.id, input)
  }

  @Mutation(() => CasePreInjury, { nullable: true })
  adminUpdateCasePreInjury(
    @CtxUser() admin: User,
    @Args('casePreInjuryId') casePreInjuryId: string,
    @Args('input') input: AdminUpdateCasePreInjuryInput,
  ) {
    return this.service.adminUpdateCasePreInjury(admin.id, casePreInjuryId, input)
  }

  @Mutation(() => CasePreInjury, { nullable: true })
  adminDeleteCasePreInjury(@CtxUser() admin: User, @Args('casePreInjuryId') casePreInjuryId: string) {
    return this.service.adminDeleteCasePreInjury(admin.id, casePreInjuryId)
  }
}

