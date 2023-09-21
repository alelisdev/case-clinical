
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards, ValidationPipe } from '@nestjs/common'
import {
  UserCreateSideInput,
  UserListSideInput,
  UserUpdateSideInput,
  ApiSideDataAccessUserService,
  Side,
} from '@case-clinical/api/side/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiSideFeatureUserResolver {
  constructor(private readonly service: ApiSideDataAccessUserService) {}

  @Query(() => [Side], { nullable: true })
  userSides(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSideInput, nullable: true }) input?: UserListSideInput,
  ) {
    return this.service.userSides(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountSides(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSideInput, nullable: true }) input?: UserListSideInput,
  ) {
    return this.service.userCountSides(user.id, input)
  }

  @Query(() => [Side], { nullable: true })
  userSelectSides(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSideInput, nullable: true }) input?: UserListSideInput,
  ) {
    return this.service.userSides(user.id, input)
  }






  @Query(() => Side, { nullable: true })
  userSide(@CtxUser() user: User, @Args('sideId') sideId: string) {
    return this.service.userSide(user.id, sideId)
  }

  @Mutation(() => Side, { nullable: true })
  userCreateSide(@CtxUser() user: User, @Args('input', new ValidationPipe()) input: UserCreateSideInput,) {
    return this.service.userCreateSide(user.id, input)
  }

  @Mutation(() => Side, { nullable: true })
  userUpdateSide(
    @CtxUser() user: User,
    @Args('sideId') sideId: string,
    @Args('input', new ValidationPipe()) input: UserUpdateSideInput,
  ) {
    return this.service.userUpdateSide(user.id, sideId, input)
  }

  @Mutation(() => Side, { nullable: true })
  userDeleteSide(@CtxUser() user: User, @Args('sideId') sideId: string) {
    return this.service.userDeleteSide(user.id, sideId)
  }
}

