
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateTreatmentInput,
  UserListTreatmentInput,
  UserUpdateTreatmentInput,
  UserUpdateTreatmentsInput,
  ApiTreatmentDataAccessUserService,
  Treatment,
} from '@case-clinical/api/treatment/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTreatmentFeatureUserResolver {
  constructor(private readonly service: ApiTreatmentDataAccessUserService) {}

  @Query(() => [Treatment], { nullable: true })
  userTreatments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTreatmentInput, nullable: true }) input?: UserListTreatmentInput,
  ) {
    return this.service.userTreatments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTreatments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTreatmentInput, nullable: true }) input?: UserListTreatmentInput,
  ) {
    return this.service.userCountTreatments(user.id, input)
  }

  @Query(() => [Treatment], { nullable: true })
  userSelectTreatments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTreatmentInput, nullable: true }) input?: UserListTreatmentInput,
  ) {
    return this.service.userSelectTreatments(user.id, input)
  }







  @Query(() => Treatment, { nullable: true })
  userTreatment(@CtxUser() user: User, @Args('treatmentId') treatmentId: string) {
    return this.service.userTreatment(user.id, treatmentId)
  }

  @Mutation(() => Treatment, { nullable: true })
  userCreateTreatment(@CtxUser() user: User, @Args('input') input: UserCreateTreatmentInput,) {
    return this.service.userCreateTreatment(user.id, input)
  }

  @Mutation(() => Treatment, { nullable: true })
  userUpdateTreatment(
    @CtxUser() user: User,
    @Args('treatmentId') treatmentId: string,
    @Args('input') input: UserUpdateTreatmentInput,
  ) {
    return this.service.userUpdateTreatment(user.id, treatmentId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateTreatments(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateTreatmentsInput,
  ) {
    return this.service.userUpdateTreatments(user.id, input)
  }

  @Mutation(() => Treatment, { nullable: true })
  userDeleteTreatment(@CtxUser() user: User, @Args('treatmentId') treatmentId: string) {
    return this.service.userDeleteTreatment(user.id, treatmentId)
  }
}

