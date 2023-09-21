
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateClaimStatusInput,
  UserListClaimStatusInput,
  UserUpdateClaimStatusInput,
  UserUpdateClaimStatusesInput,
  ApiClaimStatusDataAccessUserService,
  ClaimStatus,
} from '@case-clinical/api/claim-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiClaimStatusFeatureUserResolver {
  constructor(private readonly service: ApiClaimStatusDataAccessUserService) {}

  @Query(() => [ClaimStatus], { nullable: true })
  userClaimStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClaimStatusInput, nullable: true }) input?: UserListClaimStatusInput,
  ) {
    return this.service.userClaimStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountClaimStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClaimStatusInput, nullable: true }) input?: UserListClaimStatusInput,
  ) {
    return this.service.userCountClaimStatuses(user.id, input)
  }

  @Query(() => [ClaimStatus], { nullable: true })
  userSelectClaimStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClaimStatusInput, nullable: true }) input?: UserListClaimStatusInput,
  ) {
    return this.service.userSelectClaimStatuses(user.id, input)
  }







  @Query(() => ClaimStatus, { nullable: true })
  userClaimStatus(@CtxUser() user: User, @Args('claimStatusId') claimStatusId: string) {
    return this.service.userClaimStatus(user.id, claimStatusId)
  }

  @Mutation(() => ClaimStatus, { nullable: true })
  userCreateClaimStatus(@CtxUser() user: User, @Args('input') input: UserCreateClaimStatusInput,) {
    return this.service.userCreateClaimStatus(user.id, input)
  }

  @Mutation(() => ClaimStatus, { nullable: true })
  userUpdateClaimStatus(
    @CtxUser() user: User,
    @Args('claimStatusId') claimStatusId: string,
    @Args('input') input: UserUpdateClaimStatusInput,
  ) {
    return this.service.userUpdateClaimStatus(user.id, claimStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateClaimStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateClaimStatusesInput,
  ) {
    return this.service.userUpdateClaimStatuses(user.id, input)
  }

  @Mutation(() => ClaimStatus, { nullable: true })
  userDeleteClaimStatus(@CtxUser() user: User, @Args('claimStatusId') claimStatusId: string) {
    return this.service.userDeleteClaimStatus(user.id, claimStatusId)
  }
}

