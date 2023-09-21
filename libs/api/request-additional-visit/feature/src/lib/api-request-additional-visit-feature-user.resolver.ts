
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateRequestAdditionalVisitInput,
  UserListRequestAdditionalVisitInput,
  UserUpdateRequestAdditionalVisitInput,
  UserUpdateRequestAdditionalVisitsInput,
  ApiRequestAdditionalVisitDataAccessUserService,
  RequestAdditionalVisit,
} from '@case-clinical/api/request-additional-visit/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiRequestAdditionalVisitFeatureUserResolver {
  constructor(private readonly service: ApiRequestAdditionalVisitDataAccessUserService) {}

  @Query(() => [RequestAdditionalVisit], { nullable: true })
  userRequestAdditionalVisits(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRequestAdditionalVisitInput, nullable: true }) input?: UserListRequestAdditionalVisitInput,
  ) {
    return this.service.userRequestAdditionalVisits(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountRequestAdditionalVisits(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRequestAdditionalVisitInput, nullable: true }) input?: UserListRequestAdditionalVisitInput,
  ) {
    return this.service.userCountRequestAdditionalVisits(user.id, input)
  }

  @Query(() => [RequestAdditionalVisit], { nullable: true })
  userSelectRequestAdditionalVisits(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListRequestAdditionalVisitInput, nullable: true }) input?: UserListRequestAdditionalVisitInput,
  ) {
    return this.service.userSelectRequestAdditionalVisits(user.id, input)
  }







  @Query(() => RequestAdditionalVisit, { nullable: true })
  userRequestAdditionalVisit(@CtxUser() user: User, @Args('requestAdditionalVisitId') requestAdditionalVisitId: string) {
    return this.service.userRequestAdditionalVisit(user.id, requestAdditionalVisitId)
  }

  @Mutation(() => RequestAdditionalVisit, { nullable: true })
  userCreateRequestAdditionalVisit(@CtxUser() user: User, @Args('input') input: UserCreateRequestAdditionalVisitInput,) {
    return this.service.userCreateRequestAdditionalVisit(user.id, input)
  }

  @Mutation(() => RequestAdditionalVisit, { nullable: true })
  userUpdateRequestAdditionalVisit(
    @CtxUser() user: User,
    @Args('requestAdditionalVisitId') requestAdditionalVisitId: string,
    @Args('input') input: UserUpdateRequestAdditionalVisitInput,
  ) {
    return this.service.userUpdateRequestAdditionalVisit(user.id, requestAdditionalVisitId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateRequestAdditionalVisits(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateRequestAdditionalVisitsInput,
  ) {
    return this.service.userUpdateRequestAdditionalVisits(user.id, input)
  }

  @Mutation(() => RequestAdditionalVisit, { nullable: true })
  userDeleteRequestAdditionalVisit(@CtxUser() user: User, @Args('requestAdditionalVisitId') requestAdditionalVisitId: string) {
    return this.service.userDeleteRequestAdditionalVisit(user.id, requestAdditionalVisitId)
  }
}

