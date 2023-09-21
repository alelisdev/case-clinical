
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAttorneyTypeInput,
  UserListAttorneyTypeInput,
  UserUpdateAttorneyTypeInput,
  UserUpdateAttorneyTypesInput,
  ApiAttorneyTypeDataAccessUserService,
  AttorneyType,
} from '@case-clinical/api/attorney-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAttorneyTypeFeatureUserResolver {
  constructor(private readonly service: ApiAttorneyTypeDataAccessUserService) {}

  @Query(() => [AttorneyType], { nullable: true })
  userAttorneyTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAttorneyTypeInput, nullable: true }) input?: UserListAttorneyTypeInput,
  ) {
    return this.service.userAttorneyTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAttorneyTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAttorneyTypeInput, nullable: true }) input?: UserListAttorneyTypeInput,
  ) {
    return this.service.userCountAttorneyTypes(user.id, input)
  }

  @Query(() => [AttorneyType], { nullable: true })
  userSelectAttorneyTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAttorneyTypeInput, nullable: true }) input?: UserListAttorneyTypeInput,
  ) {
    return this.service.userSelectAttorneyTypes(user.id, input)
  }







  @Query(() => AttorneyType, { nullable: true })
  userAttorneyType(@CtxUser() user: User, @Args('attorneyTypeId') attorneyTypeId: string) {
    return this.service.userAttorneyType(user.id, attorneyTypeId)
  }

  @Mutation(() => AttorneyType, { nullable: true })
  userCreateAttorneyType(@CtxUser() user: User, @Args('input') input: UserCreateAttorneyTypeInput,) {
    return this.service.userCreateAttorneyType(user.id, input)
  }

  @Mutation(() => AttorneyType, { nullable: true })
  userUpdateAttorneyType(
    @CtxUser() user: User,
    @Args('attorneyTypeId') attorneyTypeId: string,
    @Args('input') input: UserUpdateAttorneyTypeInput,
  ) {
    return this.service.userUpdateAttorneyType(user.id, attorneyTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAttorneyTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAttorneyTypesInput,
  ) {
    return this.service.userUpdateAttorneyTypes(user.id, input)
  }

  @Mutation(() => AttorneyType, { nullable: true })
  userDeleteAttorneyType(@CtxUser() user: User, @Args('attorneyTypeId') attorneyTypeId: string) {
    return this.service.userDeleteAttorneyType(user.id, attorneyTypeId)
  }
}

