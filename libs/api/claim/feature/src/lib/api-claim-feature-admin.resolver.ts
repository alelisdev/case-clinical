
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateClaimInput,
  AdminListClaimInput,
  AdminUpdateClaimInput,
  ApiClaimDataAccessAdminService,
  Claim
} from '@case-clinical/api/claim/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { AdminListPatientInput, Patient } from '@case-clinical/api/patient/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiClaimFeatureAdminResolver {
  constructor(private readonly service: ApiClaimDataAccessAdminService) {}

  @Query(() => [Claim], { nullable: true })
  adminClaims(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClaimInput, nullable: true }) input?: AdminListClaimInput,
  ) {
    return this.service.adminClaims(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountClaims(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClaimInput, nullable: true }) input?: AdminListClaimInput,
  ) {
    return this.service.adminCountClaims(admin.id, input)
  }





  @Query(() => Claim, { nullable: true })
  adminClaim(@CtxUser() admin: User, @Args('claimId') claimId: string) {
    return this.service.adminClaim(admin.id, claimId)
  }

  @Mutation(() => Claim, { nullable: true })
  adminCreateClaim(@CtxUser() admin: User, @Args('input') input: AdminCreateClaimInput,) {
    return this.service.adminCreateClaim(admin.id, input)
  }

  @Mutation(() => Claim, { nullable: true })
  adminUpdateClaim(
    @CtxUser() admin: User,
    @Args('claimId') claimId: string,
    @Args('input') input: AdminUpdateClaimInput,
  ) {
    return this.service.adminUpdateClaim(admin.id, claimId, input)
  }

  @Mutation(() => Claim, { nullable: true })
  adminDeleteClaim(@CtxUser() admin: User, @Args('claimId') claimId: string) {
    return this.service.adminDeleteClaim(admin.id, claimId)
  }
}

