
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContractInput,
  AdminListContractInput,
  AdminUpdateContractInput,
  ApiContractDataAccessAdminService,
  Contract
} from '@case-clinical/api/contract/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListOrganizationInput, Organization } from '@case-clinical/api/organization/data-access'
import { AdminListTemplateInput, Template } from '@case-clinical/api/template/data-access'
import { AdminListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'
import { AdminListReconciliationPeriodTypeInput, ReconciliationPeriodType } from '@case-clinical/api/reconciliation-period-type/data-access'
import { AdminListCalculationBasisTypeInput, CalculationBasisType } from '@case-clinical/api/calculation-basis-type/data-access'
import { AdminListProcessInput, Process } from '@case-clinical/api/process/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContractFeatureAdminResolver {
  constructor(private readonly service: ApiContractDataAccessAdminService) {}

  @Query(() => [Contract], { nullable: true })
  adminContracts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractInput, nullable: true }) input?: AdminListContractInput,
  ) {
    return this.service.adminContracts(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContracts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractInput, nullable: true }) input?: AdminListContractInput,
  ) {
    return this.service.adminCountContracts(admin.id, input)
  }





  @Query(() => Contract, { nullable: true })
  adminContract(@CtxUser() admin: User, @Args('contractId') contractId: string) {
    return this.service.adminContract(admin.id, contractId)
  }

  @Mutation(() => Contract, { nullable: true })
  adminCreateContract(@CtxUser() admin: User, @Args('input') input: AdminCreateContractInput,) {
    return this.service.adminCreateContract(admin.id, input)
  }

  @Mutation(() => Contract, { nullable: true })
  adminUpdateContract(
    @CtxUser() admin: User,
    @Args('contractId') contractId: string,
    @Args('input') input: AdminUpdateContractInput,
  ) {
    return this.service.adminUpdateContract(admin.id, contractId, input)
  }

  @Mutation(() => Contract, { nullable: true })
  adminDeleteContract(@CtxUser() admin: User, @Args('contractId') contractId: string) {
    return this.service.adminDeleteContract(admin.id, contractId)
  }
}

