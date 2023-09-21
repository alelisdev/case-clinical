
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateInsuranceInput,
  UserListInsuranceInput,
  UserUpdateInsuranceInput,
  UserUpdateInsurancesInput,
  ApiInsuranceDataAccessUserService,
  Insurance,
} from '@case-clinical/api/insurance/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { UserListInsuranceTypeInput, InsuranceType } from '@case-clinical/api/insurance-type/data-access'
import { UserListInsuranceSectorInput, InsuranceSector } from '@case-clinical/api/insurance-sector/data-access'
import { UserListLeadInput, Lead } from '@case-clinical/api/lead/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiInsuranceFeatureUserResolver {
  constructor(private readonly service: ApiInsuranceDataAccessUserService) {}

  @Query(() => [Insurance], { nullable: true })
  userInsurances(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInsuranceInput, nullable: true }) input?: UserListInsuranceInput,
  ) {
    return this.service.userInsurances(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountInsurances(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInsuranceInput, nullable: true }) input?: UserListInsuranceInput,
  ) {
    return this.service.userCountInsurances(user.id, input)
  }

  @Query(() => [Insurance], { nullable: true })
  userSelectInsurances(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInsuranceInput, nullable: true }) input?: UserListInsuranceInput,
  ) {
    return this.service.userSelectInsurances(user.id, input)
  }







  @Query(() => Insurance, { nullable: true })
  userInsurance(@CtxUser() user: User, @Args('insuranceId') insuranceId: string) {
    return this.service.userInsurance(user.id, insuranceId)
  }

  @Mutation(() => Insurance, { nullable: true })
  userCreateInsurance(@CtxUser() user: User, @Args('input') input: UserCreateInsuranceInput,) {
    return this.service.userCreateInsurance(user.id, input)
  }

  @Mutation(() => Insurance, { nullable: true })
  userUpdateInsurance(
    @CtxUser() user: User,
    @Args('insuranceId') insuranceId: string,
    @Args('input') input: UserUpdateInsuranceInput,
  ) {
    return this.service.userUpdateInsurance(user.id, insuranceId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateInsurances(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateInsurancesInput,
  ) {
    return this.service.userUpdateInsurances(user.id, input)
  }

  @Mutation(() => Insurance, { nullable: true })
  userDeleteInsurance(@CtxUser() user: User, @Args('insuranceId') insuranceId: string) {
    return this.service.userDeleteInsurance(user.id, insuranceId)
  }
}

