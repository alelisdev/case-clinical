
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateInsuranceTypeInput,
  UserListInsuranceTypeInput,
  UserUpdateInsuranceTypeInput,
  UserUpdateInsuranceTypesInput,
  ApiInsuranceTypeDataAccessUserService,
  InsuranceType,
} from '@case-clinical/api/insurance-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiInsuranceTypeFeatureUserResolver {
  constructor(private readonly service: ApiInsuranceTypeDataAccessUserService) {}

  @Query(() => [InsuranceType], { nullable: true })
  userInsuranceTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInsuranceTypeInput, nullable: true }) input?: UserListInsuranceTypeInput,
  ) {
    return this.service.userInsuranceTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountInsuranceTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInsuranceTypeInput, nullable: true }) input?: UserListInsuranceTypeInput,
  ) {
    return this.service.userCountInsuranceTypes(user.id, input)
  }

  @Query(() => [InsuranceType], { nullable: true })
  userSelectInsuranceTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInsuranceTypeInput, nullable: true }) input?: UserListInsuranceTypeInput,
  ) {
    return this.service.userSelectInsuranceTypes(user.id, input)
  }







  @Query(() => InsuranceType, { nullable: true })
  userInsuranceType(@CtxUser() user: User, @Args('insuranceTypeId') insuranceTypeId: string) {
    return this.service.userInsuranceType(user.id, insuranceTypeId)
  }

  @Mutation(() => InsuranceType, { nullable: true })
  userCreateInsuranceType(@CtxUser() user: User, @Args('input') input: UserCreateInsuranceTypeInput,) {
    return this.service.userCreateInsuranceType(user.id, input)
  }

  @Mutation(() => InsuranceType, { nullable: true })
  userUpdateInsuranceType(
    @CtxUser() user: User,
    @Args('insuranceTypeId') insuranceTypeId: string,
    @Args('input') input: UserUpdateInsuranceTypeInput,
  ) {
    return this.service.userUpdateInsuranceType(user.id, insuranceTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateInsuranceTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateInsuranceTypesInput,
  ) {
    return this.service.userUpdateInsuranceTypes(user.id, input)
  }

  @Mutation(() => InsuranceType, { nullable: true })
  userDeleteInsuranceType(@CtxUser() user: User, @Args('insuranceTypeId') insuranceTypeId: string) {
    return this.service.userDeleteInsuranceType(user.id, insuranceTypeId)
  }
}

