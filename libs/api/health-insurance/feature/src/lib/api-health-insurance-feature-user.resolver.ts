
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateHealthInsuranceInput,
  UserListHealthInsuranceInput,
  UserUpdateHealthInsuranceInput,
  UserUpdateHealthInsurancesInput,
  ApiHealthInsuranceDataAccessUserService,
  HealthInsurance,
} from '@case-clinical/api/health-insurance/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiHealthInsuranceFeatureUserResolver {
  constructor(private readonly service: ApiHealthInsuranceDataAccessUserService) {}

  @Query(() => [HealthInsurance], { nullable: true })
  userHealthInsurances(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListHealthInsuranceInput, nullable: true }) input?: UserListHealthInsuranceInput,
  ) {
    return this.service.userHealthInsurances(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountHealthInsurances(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListHealthInsuranceInput, nullable: true }) input?: UserListHealthInsuranceInput,
  ) {
    return this.service.userCountHealthInsurances(user.id, input)
  }

  @Query(() => [HealthInsurance], { nullable: true })
  userSelectHealthInsurances(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListHealthInsuranceInput, nullable: true }) input?: UserListHealthInsuranceInput,
  ) {
    return this.service.userSelectHealthInsurances(user.id, input)
  }







  @Query(() => HealthInsurance, { nullable: true })
  userHealthInsurance(@CtxUser() user: User, @Args('healthInsuranceId') healthInsuranceId: string) {
    return this.service.userHealthInsurance(user.id, healthInsuranceId)
  }

  @Mutation(() => HealthInsurance, { nullable: true })
  userCreateHealthInsurance(@CtxUser() user: User, @Args('input') input: UserCreateHealthInsuranceInput,) {
    return this.service.userCreateHealthInsurance(user.id, input)
  }

  @Mutation(() => HealthInsurance, { nullable: true })
  userUpdateHealthInsurance(
    @CtxUser() user: User,
    @Args('healthInsuranceId') healthInsuranceId: string,
    @Args('input') input: UserUpdateHealthInsuranceInput,
  ) {
    return this.service.userUpdateHealthInsurance(user.id, healthInsuranceId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateHealthInsurances(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateHealthInsurancesInput,
  ) {
    return this.service.userUpdateHealthInsurances(user.id, input)
  }

  @Mutation(() => HealthInsurance, { nullable: true })
  userDeleteHealthInsurance(@CtxUser() user: User, @Args('healthInsuranceId') healthInsuranceId: string) {
    return this.service.userDeleteHealthInsurance(user.id, healthInsuranceId)
  }
}

