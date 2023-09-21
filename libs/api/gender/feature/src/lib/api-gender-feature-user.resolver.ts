
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateGenderInput,
  UserListGenderInput,
  UserUpdateGenderInput,
  UserUpdateGendersInput,
  ApiGenderDataAccessUserService,
  Gender,
} from '@case-clinical/api/gender/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiGenderFeatureUserResolver {
  constructor(private readonly service: ApiGenderDataAccessUserService) {}

  @Query(() => [Gender], { nullable: true })
  userGenders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListGenderInput, nullable: true }) input?: UserListGenderInput,
  ) {
    return this.service.userGenders(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountGenders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListGenderInput, nullable: true }) input?: UserListGenderInput,
  ) {
    return this.service.userCountGenders(user.id, input)
  }

  @Query(() => [Gender], { nullable: true })
  userSelectGenders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListGenderInput, nullable: true }) input?: UserListGenderInput,
  ) {
    return this.service.userSelectGenders(user.id, input)
  }







  @Query(() => Gender, { nullable: true })
  userGender(@CtxUser() user: User, @Args('genderId') genderId: string) {
    return this.service.userGender(user.id, genderId)
  }

  @Mutation(() => Gender, { nullable: true })
  userCreateGender(@CtxUser() user: User, @Args('input') input: UserCreateGenderInput,) {
    return this.service.userCreateGender(user.id, input)
  }

  @Mutation(() => Gender, { nullable: true })
  userUpdateGender(
    @CtxUser() user: User,
    @Args('genderId') genderId: string,
    @Args('input') input: UserUpdateGenderInput,
  ) {
    return this.service.userUpdateGender(user.id, genderId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateGenders(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateGendersInput,
  ) {
    return this.service.userUpdateGenders(user.id, input)
  }

  @Mutation(() => Gender, { nullable: true })
  userDeleteGender(@CtxUser() user: User, @Args('genderId') genderId: string) {
    return this.service.userDeleteGender(user.id, genderId)
  }
}

