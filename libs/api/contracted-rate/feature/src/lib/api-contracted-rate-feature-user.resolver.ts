
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContractedRateInput,
  UserListContractedRateInput,
  UserUpdateContractedRateInput,
  UserUpdateContractedRatesInput,
  ApiContractedRateDataAccessUserService,
  ContractedRate,
} from '@case-clinical/api/contracted-rate/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListContractInput, Contract } from '@case-clinical/api/contract/data-access'
import { UserListContractedRateKindInput, ContractedRateKind } from '@case-clinical/api/contracted-rate-kind/data-access'
import { UserListContractKindInput, ContractKind } from '@case-clinical/api/contract-kind/data-access'
import { UserListVisitKindInput, VisitKind } from '@case-clinical/api/visit-kind/data-access'
import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { UserListSpecialtyInput, Specialty } from '@case-clinical/api/specialty/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContractedRateFeatureUserResolver {
  constructor(private readonly service: ApiContractedRateDataAccessUserService) {}

  @Query(() => [ContractedRate], { nullable: true })
  userContractedRates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractedRateInput, nullable: true }) input?: UserListContractedRateInput,
  ) {
    return this.service.userContractedRates(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContractedRates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractedRateInput, nullable: true }) input?: UserListContractedRateInput,
  ) {
    return this.service.userCountContractedRates(user.id, input)
  }

  @Query(() => [ContractedRate], { nullable: true })
  userSelectContractedRates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractedRateInput, nullable: true }) input?: UserListContractedRateInput,
  ) {
    return this.service.userSelectContractedRates(user.id, input)
  }







  @Query(() => ContractedRate, { nullable: true })
  userContractedRate(@CtxUser() user: User, @Args('contractedRateId') contractedRateId: string) {
    return this.service.userContractedRate(user.id, contractedRateId)
  }

  @Mutation(() => ContractedRate, { nullable: true })
  userCreateContractedRate(@CtxUser() user: User, @Args('input') input: UserCreateContractedRateInput,) {
    return this.service.userCreateContractedRate(user.id, input)
  }

  @Mutation(() => ContractedRate, { nullable: true })
  userUpdateContractedRate(
    @CtxUser() user: User,
    @Args('contractedRateId') contractedRateId: string,
    @Args('input') input: UserUpdateContractedRateInput,
  ) {
    return this.service.userUpdateContractedRate(user.id, contractedRateId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContractedRates(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContractedRatesInput,
  ) {
    return this.service.userUpdateContractedRates(user.id, input)
  }

  @Mutation(() => ContractedRate, { nullable: true })
  userDeleteContractedRate(@CtxUser() user: User, @Args('contractedRateId') contractedRateId: string) {
    return this.service.userDeleteContractedRate(user.id, contractedRateId)
  }
}

