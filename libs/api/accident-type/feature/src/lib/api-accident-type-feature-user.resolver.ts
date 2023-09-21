
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAccidentTypeInput,
  UserListAccidentTypeInput,
  UserUpdateAccidentTypeInput,
  UserUpdateAccidentTypesInput,
  ApiAccidentTypeDataAccessUserService,
  AccidentType,
} from '@case-clinical/api/accident-type/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAccidentTypeFeatureUserResolver {
  constructor(private readonly service: ApiAccidentTypeDataAccessUserService) {}

  @Query(() => [AccidentType], { nullable: true })
  userAccidentTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAccidentTypeInput, nullable: true }) input?: UserListAccidentTypeInput,
  ) {
    return this.service.userAccidentTypes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAccidentTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAccidentTypeInput, nullable: true }) input?: UserListAccidentTypeInput,
  ) {
    return this.service.userCountAccidentTypes(user.id, input)
  }

  @Query(() => [AccidentType], { nullable: true })
  userSelectAccidentTypes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAccidentTypeInput, nullable: true }) input?: UserListAccidentTypeInput,
  ) {
    return this.service.userSelectAccidentTypes(user.id, input)
  }







  @Query(() => AccidentType, { nullable: true })
  userAccidentType(@CtxUser() user: User, @Args('accidentTypeId') accidentTypeId: string) {
    return this.service.userAccidentType(user.id, accidentTypeId)
  }

  @Mutation(() => AccidentType, { nullable: true })
  userCreateAccidentType(@CtxUser() user: User, @Args('input') input: UserCreateAccidentTypeInput,) {
    return this.service.userCreateAccidentType(user.id, input)
  }

  @Mutation(() => AccidentType, { nullable: true })
  userUpdateAccidentType(
    @CtxUser() user: User,
    @Args('accidentTypeId') accidentTypeId: string,
    @Args('input') input: UserUpdateAccidentTypeInput,
  ) {
    return this.service.userUpdateAccidentType(user.id, accidentTypeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAccidentTypes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAccidentTypesInput,
  ) {
    return this.service.userUpdateAccidentTypes(user.id, input)
  }

  @Mutation(() => AccidentType, { nullable: true })
  userDeleteAccidentType(@CtxUser() user: User, @Args('accidentTypeId') accidentTypeId: string) {
    return this.service.userDeleteAccidentType(user.id, accidentTypeId)
  }
}

