
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateEthnicityInput,
  UserListEthnicityInput,
  UserUpdateEthnicityInput,
  UserUpdateEthnicitiesInput,
  ApiEthnicityDataAccessUserService,
  Ethnicity,
} from '@case-clinical/api/ethnicity/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiEthnicityFeatureUserResolver {
  constructor(private readonly service: ApiEthnicityDataAccessUserService) {}

  @Query(() => [Ethnicity], { nullable: true })
  userEthnicities(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEthnicityInput, nullable: true }) input?: UserListEthnicityInput,
  ) {
    return this.service.userEthnicities(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountEthnicities(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEthnicityInput, nullable: true }) input?: UserListEthnicityInput,
  ) {
    return this.service.userCountEthnicities(user.id, input)
  }

  @Query(() => [Ethnicity], { nullable: true })
  userSelectEthnicities(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEthnicityInput, nullable: true }) input?: UserListEthnicityInput,
  ) {
    return this.service.userSelectEthnicities(user.id, input)
  }







  @Query(() => Ethnicity, { nullable: true })
  userEthnicity(@CtxUser() user: User, @Args('ethnicityId') ethnicityId: string) {
    return this.service.userEthnicity(user.id, ethnicityId)
  }

  @Mutation(() => Ethnicity, { nullable: true })
  userCreateEthnicity(@CtxUser() user: User, @Args('input') input: UserCreateEthnicityInput,) {
    return this.service.userCreateEthnicity(user.id, input)
  }

  @Mutation(() => Ethnicity, { nullable: true })
  userUpdateEthnicity(
    @CtxUser() user: User,
    @Args('ethnicityId') ethnicityId: string,
    @Args('input') input: UserUpdateEthnicityInput,
  ) {
    return this.service.userUpdateEthnicity(user.id, ethnicityId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateEthnicities(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateEthnicitiesInput,
  ) {
    return this.service.userUpdateEthnicities(user.id, input)
  }

  @Mutation(() => Ethnicity, { nullable: true })
  userDeleteEthnicity(@CtxUser() user: User, @Args('ethnicityId') ethnicityId: string) {
    return this.service.userDeleteEthnicity(user.id, ethnicityId)
  }
}

