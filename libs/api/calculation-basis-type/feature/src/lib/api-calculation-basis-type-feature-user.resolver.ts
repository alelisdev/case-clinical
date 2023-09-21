
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCalculationBasisTypeInput,
  UserListCalculationBasisTypeInput,
  UserUpdateCalculationBasisTypeInput,
  UserUpdateCalculationBasisTypesInput,
  ApiCalculationBasisTypeDataAccessUserService,
  CalculationBasisType,
} from '@case-clinical/api/calculation-basis-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCalculationBasisTypeFeatureUserResolver {
  constructor(private readonly service: ApiCalculationBasisTypeDataAccessUserService) {}

  @Query(() => [CalculationBasisType], { nullable: true })
  userCalculationBasisTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCalculationBasisTypeInput, nullable: true }) input?: UserListCalculationBasisTypeInput,
  ) {
    return this.service.userCalculationBasisTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCalculationBasisTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCalculationBasisTypeInput, nullable: true }) input?: UserListCalculationBasisTypeInput,
  ) {
    return this.service.userCountCalculationBasisTypes(user.id, input)
  }

  @Query(() => [CalculationBasisType], { nullable: true })
  userSelectCalculationBasisTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCalculationBasisTypeInput, nullable: true }) input?: UserListCalculationBasisTypeInput,
  ) {
    return this.service.userSelectCalculationBasisTypes(user.id, input)
  }







  @Query(() => CalculationBasisType, { nullable: true })
  userCalculationBasisType(@CtxUser() user: User, @Args('calculationBasisTypeId') calculationBasisTypeId: string) {
    return this.service.userCalculationBasisType(user.id, calculationBasisTypeId)
  }

  @Mutation(() => CalculationBasisType, { nullable: true })
  userCreateCalculationBasisType(@CtxUser() user: User, @Args('input') input: UserCreateCalculationBasisTypeInput,) {
    return this.service.userCreateCalculationBasisType(user.id, input)
  }

  @Mutation(() => CalculationBasisType, { nullable: true })
  userUpdateCalculationBasisType(
    @CtxUser() user: User,
    @Args('calculationBasisTypeId') calculationBasisTypeId: string,
    @Args('input') input: UserUpdateCalculationBasisTypeInput,
  ) {
    return this.service.userUpdateCalculationBasisType(user.id, calculationBasisTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCalculationBasisTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCalculationBasisTypesInput,
  ) {
    return this.service.userUpdateCalculationBasisTypes(user.id, input)
  }

  @Mutation(() => CalculationBasisType, { nullable: true })
  userDeleteCalculationBasisType(@CtxUser() user: User, @Args('calculationBasisTypeId') calculationBasisTypeId: string) {
    return this.service.userDeleteCalculationBasisType(user.id, calculationBasisTypeId)
  }
}

