
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateSpecialtyInput,
  UserListSpecialtyInput,
  UserUpdateSpecialtyInput,
  UserUpdateSpecialtiesInput,
  ApiSpecialtyDataAccessUserService,
  Specialty,
} from '@case-clinical/api/specialty/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiSpecialtyFeatureUserResolver {
  constructor(private readonly service: ApiSpecialtyDataAccessUserService) {}

  @Query(() => [Specialty], { nullable: true })
  userSpecialties(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSpecialtyInput, nullable: true }) input?: UserListSpecialtyInput,
  ) {
    return this.service.userSpecialties(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountSpecialties(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSpecialtyInput, nullable: true }) input?: UserListSpecialtyInput,
  ) {
    return this.service.userCountSpecialties(user.id, input)
  }

  @Query(() => [Specialty], { nullable: true })
  userSelectSpecialties(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSpecialtyInput, nullable: true }) input?: UserListSpecialtyInput,
  ) {
    return this.service.userSelectSpecialties(user.id, input)
  }







  @Query(() => Specialty, { nullable: true })
  userSpecialty(@CtxUser() user: User, @Args('specialtyId') specialtyId: string) {
    return this.service.userSpecialty(user.id, specialtyId)
  }

  @Mutation(() => Specialty, { nullable: true })
  userCreateSpecialty(@CtxUser() user: User, @Args('input') input: UserCreateSpecialtyInput,) {
    return this.service.userCreateSpecialty(user.id, input)
  }

  @Mutation(() => Specialty, { nullable: true })
  userUpdateSpecialty(
    @CtxUser() user: User,
    @Args('specialtyId') specialtyId: string,
    @Args('input') input: UserUpdateSpecialtyInput,
  ) {
    return this.service.userUpdateSpecialty(user.id, specialtyId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateSpecialties(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateSpecialtiesInput,
  ) {
    return this.service.userUpdateSpecialties(user.id, input)
  }

  @Mutation(() => Specialty, { nullable: true })
  userDeleteSpecialty(@CtxUser() user: User, @Args('specialtyId') specialtyId: string) {
    return this.service.userDeleteSpecialty(user.id, specialtyId)
  }
}

