
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateClaimProcedureInput,
  UserListClaimProcedureInput,
  UserUpdateClaimProcedureInput,
  UserUpdateClaimProceduresInput,
  ApiClaimProcedureDataAccessUserService,
  ClaimProcedure,
} from '@case-clinical/api/claim-procedure/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPlaceOfServiceInput, PlaceOfService } from '@case-clinical/api/place-of-service/data-access'
import { UserListClaimStatusInput, ClaimStatus } from '@case-clinical/api/claim-status/data-access'
import { UserListClaimInput, Claim } from '@case-clinical/api/claim/data-access'
import { UserListAppointmentInput, Appointment } from '@case-clinical/api/appointment/data-access'
import { UserListProcedureInput, Procedure } from '@case-clinical/api/procedure/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiClaimProcedureFeatureUserResolver {
  constructor(private readonly service: ApiClaimProcedureDataAccessUserService) {}

  @Query(() => [ClaimProcedure], { nullable: true })
  userClaimProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClaimProcedureInput, nullable: true }) input?: UserListClaimProcedureInput,
  ) {
    return this.service.userClaimProcedures(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountClaimProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClaimProcedureInput, nullable: true }) input?: UserListClaimProcedureInput,
  ) {
    return this.service.userCountClaimProcedures(user.id, input)
  }

  @Query(() => [ClaimProcedure], { nullable: true })
  userSelectClaimProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClaimProcedureInput, nullable: true }) input?: UserListClaimProcedureInput,
  ) {
    return this.service.userSelectClaimProcedures(user.id, input)
  }







  @Query(() => ClaimProcedure, { nullable: true })
  userClaimProcedure(@CtxUser() user: User, @Args('claimProcedureId') claimProcedureId: string) {
    return this.service.userClaimProcedure(user.id, claimProcedureId)
  }

  @Mutation(() => ClaimProcedure, { nullable: true })
  userCreateClaimProcedure(@CtxUser() user: User, @Args('input') input: UserCreateClaimProcedureInput,) {
    return this.service.userCreateClaimProcedure(user.id, input)
  }

  @Mutation(() => ClaimProcedure, { nullable: true })
  userUpdateClaimProcedure(
    @CtxUser() user: User,
    @Args('claimProcedureId') claimProcedureId: string,
    @Args('input') input: UserUpdateClaimProcedureInput,
  ) {
    return this.service.userUpdateClaimProcedure(user.id, claimProcedureId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateClaimProcedures(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateClaimProceduresInput,
  ) {
    return this.service.userUpdateClaimProcedures(user.id, input)
  }

  @Mutation(() => ClaimProcedure, { nullable: true })
  userDeleteClaimProcedure(@CtxUser() user: User, @Args('claimProcedureId') claimProcedureId: string) {
    return this.service.userDeleteClaimProcedure(user.id, claimProcedureId)
  }
}

