
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateWhereDoesItHurtSpecialtyInput,
  UserListWhereDoesItHurtSpecialtyInput,
  UserUpdateWhereDoesItHurtSpecialtyInput,
  ApiWhereDoesItHurtSpecialtyDataAccessUserService,
  WhereDoesItHurtSpecialty,
} from '@case-clinical/api/where-does-it-hurt-specialty/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiWhereDoesItHurtSpecialtyFeatureUserResolver {
  constructor(private readonly service: ApiWhereDoesItHurtSpecialtyDataAccessUserService) {}

  @Query(() => [WhereDoesItHurtSpecialty], { nullable: true })
  userWhereDoesItHurtSpecialties(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWhereDoesItHurtSpecialtyInput, nullable: true }) input?: UserListWhereDoesItHurtSpecialtyInput,
  ) {
    return this.service.userWhereDoesItHurtSpecialties(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountWhereDoesItHurtSpecialties(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListWhereDoesItHurtSpecialtyInput, nullable: true }) input?: UserListWhereDoesItHurtSpecialtyInput,
  ) {
    return this.service.userCountWhereDoesItHurtSpecialties(user.id, input)
  }






  @Query(() => WhereDoesItHurtSpecialty, { nullable: true })
  userWhereDoesItHurtSpecialty(@CtxUser() user: User, @Args('whereDoesItHurtSpecialtyId') whereDoesItHurtSpecialtyId: string) {
    return this.service.userWhereDoesItHurtSpecialty(user.id, whereDoesItHurtSpecialtyId)
  }

  @Mutation(() => WhereDoesItHurtSpecialty, { nullable: true })
  userCreateWhereDoesItHurtSpecialty(@CtxUser() user: User, @Args('input') input: UserCreateWhereDoesItHurtSpecialtyInput,) {
    return this.service.userCreateWhereDoesItHurtSpecialty(user.id, input)
  }

  @Mutation(() => WhereDoesItHurtSpecialty, { nullable: true })
  userUpdateWhereDoesItHurtSpecialty(
    @CtxUser() user: User,
    @Args('whereDoesItHurtSpecialtyId') whereDoesItHurtSpecialtyId: string,
    @Args('input') input: UserUpdateWhereDoesItHurtSpecialtyInput,
  ) {
    return this.service.userUpdateWhereDoesItHurtSpecialty(user.id, whereDoesItHurtSpecialtyId, input)
  }

  @Mutation(() => WhereDoesItHurtSpecialty, { nullable: true })
  userDeleteWhereDoesItHurtSpecialty(@CtxUser() user: User, @Args('whereDoesItHurtSpecialtyId') whereDoesItHurtSpecialtyId: string) {
    return this.service.userDeleteWhereDoesItHurtSpecialty(user.id, whereDoesItHurtSpecialtyId)
  }
}

