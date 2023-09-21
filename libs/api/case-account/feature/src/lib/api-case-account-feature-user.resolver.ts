
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCaseAccountInput,
  UserListCaseAccountInput,
  UserUpdateCaseAccountInput,
  UserUpdateCaseAccountsInput,
  ApiCaseAccountDataAccessUserService,
  CaseAccount,
} from '@case-clinical/api/case-account/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { UserListLocationInput, Location } from '@case-clinical/api/location/data-access'
import { UserListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'
import { UserListAccountStatusInput, AccountStatus } from '@case-clinical/api/account-status/data-access'
import { UserListProcedureTypeInput, ProcedureType } from '@case-clinical/api/procedure-type/data-access'
import { UserListAgreementTypeInput, AgreementType } from '@case-clinical/api/agreement-type/data-access'
import { UserListClaimProcedureInput, ClaimProcedure } from '@case-clinical/api/claim-procedure/data-access'
import { UserListInvoiceDetailInput, InvoiceDetail } from '@case-clinical/api/invoice-detail/data-access'
import { UserListContractInput, Contract } from '@case-clinical/api/contract/data-access'
import { UserListPortfolioInput, Portfolio } from '@case-clinical/api/portfolio/data-access'
import { UserListProcedureVendorInput, ProcedureVendor } from '@case-clinical/api/procedure-vendor/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCaseAccountFeatureUserResolver {
  constructor(private readonly service: ApiCaseAccountDataAccessUserService) {}

  @Query(() => [CaseAccount], { nullable: true })
  userCaseAccounts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseAccountInput, nullable: true }) input?: UserListCaseAccountInput,
  ) {
    return this.service.userCaseAccounts(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCaseAccounts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseAccountInput, nullable: true }) input?: UserListCaseAccountInput,
  ) {
    return this.service.userCountCaseAccounts(user.id, input)
  }

  @Query(() => [CaseAccount], { nullable: true })
  userSelectCaseAccounts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCaseAccountInput, nullable: true }) input?: UserListCaseAccountInput,
  ) {
    return this.service.userSelectCaseAccounts(user.id, input)
  }







  @Query(() => CaseAccount, { nullable: true })
  userCaseAccount(@CtxUser() user: User, @Args('caseAccountId') caseAccountId: string) {
    return this.service.userCaseAccount(user.id, caseAccountId)
  }

  @Mutation(() => CaseAccount, { nullable: true })
  userCreateCaseAccount(@CtxUser() user: User, @Args('input') input: UserCreateCaseAccountInput,) {
    return this.service.userCreateCaseAccount(user.id, input)
  }

  @Mutation(() => CaseAccount, { nullable: true })
  userUpdateCaseAccount(
    @CtxUser() user: User,
    @Args('caseAccountId') caseAccountId: string,
    @Args('input') input: UserUpdateCaseAccountInput,
  ) {
    return this.service.userUpdateCaseAccount(user.id, caseAccountId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCaseAccounts(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCaseAccountsInput,
  ) {
    return this.service.userUpdateCaseAccounts(user.id, input)
  }

  @Mutation(() => CaseAccount, { nullable: true })
  userDeleteCaseAccount(@CtxUser() user: User, @Args('caseAccountId') caseAccountId: string) {
    return this.service.userDeleteCaseAccount(user.id, caseAccountId)
  }
}

