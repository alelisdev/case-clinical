
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateWhereDoesItHurtInput,
  UserListWhereDoesItHurtInput,
  UserUpdateWhereDoesItHurtInput,
  ApiWhereDoesItHurtDataAccessUserService,
  WhereDoesItHurt,
} from '@case-clinical/api/where-does-it-hurt/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiWhereDoesItHurtFeatureUserResolver {
  constructor(private readonly service: ApiWhereDoesItHurtDataAccessUserService) {}

  @Query(() => [WhereDoesItHurt], { nullable: true })
  userWhereDoesItHurts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWhereDoesItHurtInput, nullable: true }) input?: UserListWhereDoesItHurtInput,
  ) {
    return this.service.userWhereDoesItHurts(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountWhereDoesItHurts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWhereDoesItHurtInput, nullable: true }) input?: UserListWhereDoesItHurtInput,
  ) {
    return this.service.userCountWhereDoesItHurts(user.id, input)
  }

  @Query(() => [WhereDoesItHurt], { nullable: true })
  userSelectWhereDoesItHurts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWhereDoesItHurtInput, nullable: true }) input?: UserListWhereDoesItHurtInput,
  ) {
    return this.service.userWhereDoesItHurts(user.id, input)
  }






  @Query(() => WhereDoesItHurt, { nullable: true })
  userWhereDoesItHurt(@CtxUser() user: User, @Args('whereDoesItHurtId') whereDoesItHurtId: string) {
    return this.service.userWhereDoesItHurt(user.id, whereDoesItHurtId)
  }

  @Mutation(() => WhereDoesItHurt, { nullable: true })
  userCreateWhereDoesItHurt(@CtxUser() user: User, @Args('input') input: UserCreateWhereDoesItHurtInput,) {
    return this.service.userCreateWhereDoesItHurt(user.id, input)
  }

  @Mutation(() => WhereDoesItHurt, { nullable: true })
  userUpdateWhereDoesItHurt(
    @CtxUser() user: User,
    @Args('whereDoesItHurtId') whereDoesItHurtId: string,
    @Args('input') input: UserUpdateWhereDoesItHurtInput,
  ) {
    return this.service.userUpdateWhereDoesItHurt(user.id, whereDoesItHurtId, input)
  }

  @Mutation(() => WhereDoesItHurt, { nullable: true })
  userDeleteWhereDoesItHurt(@CtxUser() user: User, @Args('whereDoesItHurtId') whereDoesItHurtId: string) {
    return this.service.userDeleteWhereDoesItHurt(user.id, whereDoesItHurtId)
  }
}

