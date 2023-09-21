
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateClaimInput,
  UserListClaimInput,
  UserUpdateClaimInput,
  UserUpdateClaimsInput,
  ApiClaimDataAccessUserService,
  Claim,
} from '@case-clinical/api/claim/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'
import { UserListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { UserListPatientInput, Patient } from '@case-clinical/api/patient/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiClaimFeatureUserResolver {
  constructor(private readonly service: ApiClaimDataAccessUserService) {}

  @Query(() => [Claim], { nullable: true })
  userClaims(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClaimInput, nullable: true }) input?: UserListClaimInput,
  ) {
    return this.service.userClaims(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountClaims(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClaimInput, nullable: true }) input?: UserListClaimInput,
  ) {
    return this.service.userCountClaims(user.id, input)
  }

  @Query(() => [Claim], { nullable: true })
  userSelectClaims(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClaimInput, nullable: true }) input?: UserListClaimInput,
  ) {
    return this.service.userSelectClaims(user.id, input)
  }







  @Query(() => Claim, { nullable: true })
  userClaim(@CtxUser() user: User, @Args('claimId') claimId: string) {
    return this.service.userClaim(user.id, claimId)
  }

  @Mutation(() => Claim, { nullable: true })
  userCreateClaim(@CtxUser() user: User, @Args('input') input: UserCreateClaimInput,) {
    return this.service.userCreateClaim(user.id, input)
  }

  @Mutation(() => Claim, { nullable: true })
  userUpdateClaim(
    @CtxUser() user: User,
    @Args('claimId') claimId: string,
    @Args('input') input: UserUpdateClaimInput,
  ) {
    return this.service.userUpdateClaim(user.id, claimId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateClaims(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateClaimsInput,
  ) {
    return this.service.userUpdateClaims(user.id, input)
  }

  @Mutation(() => Claim, { nullable: true })
  userDeleteClaim(@CtxUser() user: User, @Args('claimId') claimId: string) {
    return this.service.userDeleteClaim(user.id, claimId)
  }
}

