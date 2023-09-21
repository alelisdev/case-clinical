
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateInsuranceInput,
  AdminListInsuranceInput,
  AdminUpdateInsuranceInput,
  ApiInsuranceDataAccessAdminService,
  Insurance
} from '@case-clinical/api/insurance/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { AdminListInsuranceTypeInput, InsuranceType } from '@case-clinical/api/insurance-type/data-access'
import { AdminListInsuranceSectorInput, InsuranceSector } from '@case-clinical/api/insurance-sector/data-access'
import { AdminListLeadInput, Lead } from '@case-clinical/api/lead/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiInsuranceFeatureAdminResolver {
  constructor(private readonly service: ApiInsuranceDataAccessAdminService) {}

  @Query(() => [Insurance], { nullable: true })
  adminInsurances(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInsuranceInput, nullable: true }) input?: AdminListInsuranceInput,
  ) {
    return this.service.adminInsurances(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountInsurances(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListInsuranceInput, nullable: true }) input?: AdminListInsuranceInput,
  ) {
    return this.service.adminCountInsurances(admin.id, input)
  }





  @Query(() => Insurance, { nullable: true })
  adminInsurance(@CtxUser() admin: User, @Args('insuranceId') insuranceId: string) {
    return this.service.adminInsurance(admin.id, insuranceId)
  }

  @Mutation(() => Insurance, { nullable: true })
  adminCreateInsurance(@CtxUser() admin: User, @Args('input') input: AdminCreateInsuranceInput,) {
    return this.service.adminCreateInsurance(admin.id, input)
  }

  @Mutation(() => Insurance, { nullable: true })
  adminUpdateInsurance(
    @CtxUser() admin: User,
    @Args('insuranceId') insuranceId: string,
    @Args('input') input: AdminUpdateInsuranceInput,
  ) {
    return this.service.adminUpdateInsurance(admin.id, insuranceId, input)
  }

  @Mutation(() => Insurance, { nullable: true })
  adminDeleteInsurance(@CtxUser() admin: User, @Args('insuranceId') insuranceId: string) {
    return this.service.adminDeleteInsurance(admin.id, insuranceId)
  }
}

