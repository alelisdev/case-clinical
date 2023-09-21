
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateContractInput,
  UserListContractInput,
  UserUpdateContractInput,
  UserUpdateContractsInput,
  ApiContractDataAccessUserService,
  Contract,
} from '@case-clinical/api/contract/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListOrganizationInput, Organization } from '@case-clinical/api/organization/data-access'
import { UserListTemplateInput, Template } from '@case-clinical/api/template/data-access'
import { UserListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'
import { UserListReconciliationPeriodTypeInput, ReconciliationPeriodType } from '@case-clinical/api/reconciliation-period-type/data-access'
import { UserListCalculationBasisTypeInput, CalculationBasisType } from '@case-clinical/api/calculation-basis-type/data-access'
import { UserListProcessInput, Process } from '@case-clinical/api/process/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiContractFeatureUserResolver {
  constructor(private readonly service: ApiContractDataAccessUserService) {}

  @Query(() => [Contract], { nullable: true })
  userContracts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractInput, nullable: true }) input?: UserListContractInput,
  ) {
    return this.service.userContracts(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountContracts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractInput, nullable: true }) input?: UserListContractInput,
  ) {
    return this.service.userCountContracts(user.id, input)
  }

  @Query(() => [Contract], { nullable: true })
  userSelectContracts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListContractInput, nullable: true }) input?: UserListContractInput,
  ) {
    return this.service.userSelectContracts(user.id, input)
  }







  @Query(() => Contract, { nullable: true })
  userContract(@CtxUser() user: User, @Args('contractId') contractId: string) {
    return this.service.userContract(user.id, contractId)
  }

  @Mutation(() => Contract, { nullable: true })
  userCreateContract(@CtxUser() user: User, @Args('input') input: UserCreateContractInput,) {
    return this.service.userCreateContract(user.id, input)
  }

  @Mutation(() => Contract, { nullable: true })
  userUpdateContract(
    @CtxUser() user: User,
    @Args('contractId') contractId: string,
    @Args('input') input: UserUpdateContractInput,
  ) {
    return this.service.userUpdateContract(user.id, contractId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateContracts(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateContractsInput,
  ) {
    return this.service.userUpdateContracts(user.id, input)
  }

  @Mutation(() => Contract, { nullable: true })
  userDeleteContract(@CtxUser() user: User, @Args('contractId') contractId: string) {
    return this.service.userDeleteContract(user.id, contractId)
  }
}

