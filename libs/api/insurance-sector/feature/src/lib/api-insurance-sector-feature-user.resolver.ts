
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateInsuranceSectorInput,
  UserListInsuranceSectorInput,
  UserUpdateInsuranceSectorInput,
  UserUpdateInsuranceSectorsInput,
  ApiInsuranceSectorDataAccessUserService,
  InsuranceSector,
} from '@case-clinical/api/insurance-sector/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiInsuranceSectorFeatureUserResolver {
  constructor(private readonly service: ApiInsuranceSectorDataAccessUserService) {}

  @Query(() => [InsuranceSector], { nullable: true })
  userInsuranceSectors(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInsuranceSectorInput, nullable: true }) input?: UserListInsuranceSectorInput,
  ) {
    return this.service.userInsuranceSectors(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountInsuranceSectors(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInsuranceSectorInput, nullable: true }) input?: UserListInsuranceSectorInput,
  ) {
    return this.service.userCountInsuranceSectors(user.id, input)
  }

  @Query(() => [InsuranceSector], { nullable: true })
  userSelectInsuranceSectors(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInsuranceSectorInput, nullable: true }) input?: UserListInsuranceSectorInput,
  ) {
    return this.service.userSelectInsuranceSectors(user.id, input)
  }







  @Query(() => InsuranceSector, { nullable: true })
  userInsuranceSector(@CtxUser() user: User, @Args('insuranceSectorId') insuranceSectorId: string) {
    return this.service.userInsuranceSector(user.id, insuranceSectorId)
  }

  @Mutation(() => InsuranceSector, { nullable: true })
  userCreateInsuranceSector(@CtxUser() user: User, @Args('input') input: UserCreateInsuranceSectorInput,) {
    return this.service.userCreateInsuranceSector(user.id, input)
  }

  @Mutation(() => InsuranceSector, { nullable: true })
  userUpdateInsuranceSector(
    @CtxUser() user: User,
    @Args('insuranceSectorId') insuranceSectorId: string,
    @Args('input') input: UserUpdateInsuranceSectorInput,
  ) {
    return this.service.userUpdateInsuranceSector(user.id, insuranceSectorId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateInsuranceSectors(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateInsuranceSectorsInput,
  ) {
    return this.service.userUpdateInsuranceSectors(user.id, input)
  }

  @Mutation(() => InsuranceSector, { nullable: true })
  userDeleteInsuranceSector(@CtxUser() user: User, @Args('insuranceSectorId') insuranceSectorId: string) {
    return this.service.userDeleteInsuranceSector(user.id, insuranceSectorId)
  }
}

