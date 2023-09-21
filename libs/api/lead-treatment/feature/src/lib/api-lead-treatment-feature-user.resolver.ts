
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateLeadTreatmentInput,
  UserListLeadTreatmentInput,
  UserUpdateLeadTreatmentInput,
  UserUpdateLeadTreatmentsInput,
  ApiLeadTreatmentDataAccessUserService,
  LeadTreatment,
} from '@case-clinical/api/lead-treatment/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLeadInput, Lead } from '@case-clinical/api/lead/data-access'
import { UserListTreatmentInput, Treatment } from '@case-clinical/api/treatment/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiLeadTreatmentFeatureUserResolver {
  constructor(private readonly service: ApiLeadTreatmentDataAccessUserService) {}

  @Query(() => [LeadTreatment], { nullable: true })
  userLeadTreatments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadTreatmentInput, nullable: true }) input?: UserListLeadTreatmentInput,
  ) {
    return this.service.userLeadTreatments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountLeadTreatments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadTreatmentInput, nullable: true }) input?: UserListLeadTreatmentInput,
  ) {
    return this.service.userCountLeadTreatments(user.id, input)
  }

  @Query(() => [LeadTreatment], { nullable: true })
  userSelectLeadTreatments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadTreatmentInput, nullable: true }) input?: UserListLeadTreatmentInput,
  ) {
    return this.service.userSelectLeadTreatments(user.id, input)
  }







  @Query(() => LeadTreatment, { nullable: true })
  userLeadTreatment(@CtxUser() user: User, @Args('leadTreatmentId') leadTreatmentId: string) {
    return this.service.userLeadTreatment(user.id, leadTreatmentId)
  }

  @Mutation(() => LeadTreatment, { nullable: true })
  userCreateLeadTreatment(@CtxUser() user: User, @Args('input') input: UserCreateLeadTreatmentInput,) {
    return this.service.userCreateLeadTreatment(user.id, input)
  }

  @Mutation(() => LeadTreatment, { nullable: true })
  userUpdateLeadTreatment(
    @CtxUser() user: User,
    @Args('leadTreatmentId') leadTreatmentId: string,
    @Args('input') input: UserUpdateLeadTreatmentInput,
  ) {
    return this.service.userUpdateLeadTreatment(user.id, leadTreatmentId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateLeadTreatments(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateLeadTreatmentsInput,
  ) {
    return this.service.userUpdateLeadTreatments(user.id, input)
  }

  @Mutation(() => LeadTreatment, { nullable: true })
  userDeleteLeadTreatment(@CtxUser() user: User, @Args('leadTreatmentId') leadTreatmentId: string) {
    return this.service.userDeleteLeadTreatment(user.id, leadTreatmentId)
  }
}

