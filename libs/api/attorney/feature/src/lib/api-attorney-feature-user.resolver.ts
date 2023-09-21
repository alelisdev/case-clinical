
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAttorneyInput,
  UserListAttorneyInput,
  UserUpdateAttorneyInput,
  UserUpdateAttorneysInput,
  ApiAttorneyDataAccessUserService,
  Attorney,
} from '@case-clinical/api/attorney/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListFirmInput, Firm } from '@case-clinical/api/firm/data-access'
import { UserListAttorneyStatusInput, AttorneyStatus } from '@case-clinical/api/attorney-status/data-access'
import { UserListAttorneyTypeInput, AttorneyType } from '@case-clinical/api/attorney-type/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAttorneyFeatureUserResolver {
  constructor(private readonly service: ApiAttorneyDataAccessUserService) {}

  @Query(() => [Attorney], { nullable: true })
  userAttorneys(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAttorneyInput, nullable: true }) input?: UserListAttorneyInput,
  ) {
    return this.service.userAttorneys(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAttorneys(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAttorneyInput, nullable: true }) input?: UserListAttorneyInput,
  ) {
    return this.service.userCountAttorneys(user.id, input)
  }

  @Query(() => [Attorney], { nullable: true })
  userSelectAttorneys(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAttorneyInput, nullable: true }) input?: UserListAttorneyInput,
  ) {
    return this.service.userSelectAttorneys(user.id, input)
  }







  @Query(() => Attorney, { nullable: true })
  userAttorney(@CtxUser() user: User, @Args('attorneyId') attorneyId: string) {
    return this.service.userAttorney(user.id, attorneyId)
  }

  @Mutation(() => Attorney, { nullable: true })
  userCreateAttorney(@CtxUser() user: User, @Args('input') input: UserCreateAttorneyInput,) {
    return this.service.userCreateAttorney(user.id, input)
  }

  @Mutation(() => Attorney, { nullable: true })
  userUpdateAttorney(
    @CtxUser() user: User,
    @Args('attorneyId') attorneyId: string,
    @Args('input') input: UserUpdateAttorneyInput,
  ) {
    return this.service.userUpdateAttorney(user.id, attorneyId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAttorneys(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAttorneysInput,
  ) {
    return this.service.userUpdateAttorneys(user.id, input)
  }

  @Mutation(() => Attorney, { nullable: true })
  userDeleteAttorney(@CtxUser() user: User, @Args('attorneyId') attorneyId: string) {
    return this.service.userDeleteAttorney(user.id, attorneyId)
  }
}

