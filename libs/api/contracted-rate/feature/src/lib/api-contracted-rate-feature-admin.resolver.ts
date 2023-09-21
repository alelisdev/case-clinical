
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContractedRateInput,
  AdminListContractedRateInput,
  AdminUpdateContractedRateInput,
  ApiContractedRateDataAccessAdminService,
  ContractedRate
} from '@case-clinical/api/contracted-rate/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListContractInput, Contract } from '@case-clinical/api/contract/data-access'
import { AdminListContractedRateKindInput, ContractedRateKind } from '@case-clinical/api/contracted-rate-kind/data-access'
import { AdminListContractKindInput, ContractKind } from '@case-clinical/api/contract-kind/data-access'
import { AdminListVisitKindInput, VisitKind } from '@case-clinical/api/visit-kind/data-access'
import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListSpecialtyInput, Specialty } from '@case-clinical/api/specialty/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContractedRateFeatureAdminResolver {
  constructor(private readonly service: ApiContractedRateDataAccessAdminService) {}

  @Query(() => [ContractedRate], { nullable: true })
  adminContractedRates(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractedRateInput, nullable: true }) input?: AdminListContractedRateInput,
  ) {
    return this.service.adminContractedRates(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContractedRates(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractedRateInput, nullable: true }) input?: AdminListContractedRateInput,
  ) {
    return this.service.adminCountContractedRates(admin.id, input)
  }





  @Query(() => ContractedRate, { nullable: true })
  adminContractedRate(@CtxUser() admin: User, @Args('contractedRateId') contractedRateId: string) {
    return this.service.adminContractedRate(admin.id, contractedRateId)
  }

  @Mutation(() => ContractedRate, { nullable: true })
  adminCreateContractedRate(@CtxUser() admin: User, @Args('input') input: AdminCreateContractedRateInput,) {
    return this.service.adminCreateContractedRate(admin.id, input)
  }

  @Mutation(() => ContractedRate, { nullable: true })
  adminUpdateContractedRate(
    @CtxUser() admin: User,
    @Args('contractedRateId') contractedRateId: string,
    @Args('input') input: AdminUpdateContractedRateInput,
  ) {
    return this.service.adminUpdateContractedRate(admin.id, contractedRateId, input)
  }

  @Mutation(() => ContractedRate, { nullable: true })
  adminDeleteContractedRate(@CtxUser() admin: User, @Args('contractedRateId') contractedRateId: string) {
    return this.service.adminDeleteContractedRate(admin.id, contractedRateId)
  }
}

