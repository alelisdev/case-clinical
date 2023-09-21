
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePriorMedsToDateInput,
  UserListPriorMedsToDateInput,
  UserUpdatePriorMedsToDateInput,
  UserUpdatePriorMedsToDatesInput,
  ApiPriorMedsToDateDataAccessUserService,
  PriorMedsToDate,
} from '@case-clinical/api/prior-meds-to-date/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { UserListPriorMedsToDateStatusInput, PriorMedsToDateStatus } from '@case-clinical/api/prior-meds-to-date-status/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPriorMedsToDateFeatureUserResolver {
  constructor(private readonly service: ApiPriorMedsToDateDataAccessUserService) {}

  @Query(() => [PriorMedsToDate], { nullable: true })
  userPriorMedsToDates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorMedsToDateInput, nullable: true }) input?: UserListPriorMedsToDateInput,
  ) {
    return this.service.userPriorMedsToDates(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPriorMedsToDates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorMedsToDateInput, nullable: true }) input?: UserListPriorMedsToDateInput,
  ) {
    return this.service.userCountPriorMedsToDates(user.id, input)
  }

  @Query(() => [PriorMedsToDate], { nullable: true })
  userSelectPriorMedsToDates(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorMedsToDateInput, nullable: true }) input?: UserListPriorMedsToDateInput,
  ) {
    return this.service.userSelectPriorMedsToDates(user.id, input)
  }







  @Query(() => PriorMedsToDate, { nullable: true })
  userPriorMedsToDate(@CtxUser() user: User, @Args('priorMedsToDateId') priorMedsToDateId: string) {
    return this.service.userPriorMedsToDate(user.id, priorMedsToDateId)
  }

  @Mutation(() => PriorMedsToDate, { nullable: true })
  userCreatePriorMedsToDate(@CtxUser() user: User, @Args('input') input: UserCreatePriorMedsToDateInput,) {
    return this.service.userCreatePriorMedsToDate(user.id, input)
  }

  @Mutation(() => PriorMedsToDate, { nullable: true })
  userUpdatePriorMedsToDate(
    @CtxUser() user: User,
    @Args('priorMedsToDateId') priorMedsToDateId: string,
    @Args('input') input: UserUpdatePriorMedsToDateInput,
  ) {
    return this.service.userUpdatePriorMedsToDate(user.id, priorMedsToDateId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePriorMedsToDates(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePriorMedsToDatesInput,
  ) {
    return this.service.userUpdatePriorMedsToDates(user.id, input)
  }

  @Mutation(() => PriorMedsToDate, { nullable: true })
  userDeletePriorMedsToDate(@CtxUser() user: User, @Args('priorMedsToDateId') priorMedsToDateId: string) {
    return this.service.userDeletePriorMedsToDate(user.id, priorMedsToDateId)
  }
}

