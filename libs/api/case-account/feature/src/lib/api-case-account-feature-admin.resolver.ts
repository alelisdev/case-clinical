
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCaseAccountInput,
  AdminListCaseAccountInput,
  AdminUpdateCaseAccountInput,
  ApiCaseAccountDataAccessAdminService,
  CaseAccount
} from '@case-clinical/api/case-account/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { AdminListLocationInput, Location } from '@case-clinical/api/location/data-access'
import { AdminListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'
import { AdminListAccountStatusInput, AccountStatus } from '@case-clinical/api/account-status/data-access'
import { AdminListProcedureTypeInput, ProcedureType } from '@case-clinical/api/procedure-type/data-access'
import { AdminListAgreementTypeInput, AgreementType } from '@case-clinical/api/agreement-type/data-access'
import { AdminListClaimProcedureInput, ClaimProcedure } from '@case-clinical/api/claim-procedure/data-access'
import { AdminListInvoiceDetailInput, InvoiceDetail } from '@case-clinical/api/invoice-detail/data-access'
import { AdminListContractInput, Contract } from '@case-clinical/api/contract/data-access'
import { AdminListPortfolioInput, Portfolio } from '@case-clinical/api/portfolio/data-access'
import { AdminListProcedureVendorInput, ProcedureVendor } from '@case-clinical/api/procedure-vendor/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCaseAccountFeatureAdminResolver {
  constructor(private readonly service: ApiCaseAccountDataAccessAdminService) {}

  @Query(() => [CaseAccount], { nullable: true })
  adminCaseAccounts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseAccountInput, nullable: true }) input?: AdminListCaseAccountInput,
  ) {
    return this.service.adminCaseAccounts(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCaseAccounts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCaseAccountInput, nullable: true }) input?: AdminListCaseAccountInput,
  ) {
    return this.service.adminCountCaseAccounts(admin.id, input)
  }





  @Query(() => CaseAccount, { nullable: true })
  adminCaseAccount(@CtxUser() admin: User, @Args('caseAccountId') caseAccountId: string) {
    return this.service.adminCaseAccount(admin.id, caseAccountId)
  }

  @Mutation(() => CaseAccount, { nullable: true })
  adminCreateCaseAccount(@CtxUser() admin: User, @Args('input') input: AdminCreateCaseAccountInput,) {
    return this.service.adminCreateCaseAccount(admin.id, input)
  }

  @Mutation(() => CaseAccount, { nullable: true })
  adminUpdateCaseAccount(
    @CtxUser() admin: User,
    @Args('caseAccountId') caseAccountId: string,
    @Args('input') input: AdminUpdateCaseAccountInput,
  ) {
    return this.service.adminUpdateCaseAccount(admin.id, caseAccountId, input)
  }

  @Mutation(() => CaseAccount, { nullable: true })
  adminDeleteCaseAccount(@CtxUser() admin: User, @Args('caseAccountId') caseAccountId: string) {
    return this.service.adminDeleteCaseAccount(admin.id, caseAccountId)
  }
}

