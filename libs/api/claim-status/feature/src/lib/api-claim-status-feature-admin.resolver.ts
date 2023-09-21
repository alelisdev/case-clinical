
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateClaimStatusInput,
  AdminListClaimStatusInput,
  AdminUpdateClaimStatusInput,
  ApiClaimStatusDataAccessAdminService,
  ClaimStatus
} from '@case-clinical/api/claim-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiClaimStatusFeatureAdminResolver {
  constructor(private readonly service: ApiClaimStatusDataAccessAdminService) {}

  @Query(() => [ClaimStatus], { nullable: true })
  adminClaimStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClaimStatusInput, nullable: true }) input?: AdminListClaimStatusInput,
  ) {
    return this.service.adminClaimStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountClaimStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClaimStatusInput, nullable: true }) input?: AdminListClaimStatusInput,
  ) {
    return this.service.adminCountClaimStatuses(admin.id, input)
  }





  @Query(() => ClaimStatus, { nullable: true })
  adminClaimStatus(@CtxUser() admin: User, @Args('claimStatusId') claimStatusId: string) {
    return this.service.adminClaimStatus(admin.id, claimStatusId)
  }

  @Mutation(() => ClaimStatus, { nullable: true })
  adminCreateClaimStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateClaimStatusInput,) {
    return this.service.adminCreateClaimStatus(admin.id, input)
  }

  @Mutation(() => ClaimStatus, { nullable: true })
  adminUpdateClaimStatus(
    @CtxUser() admin: User,
    @Args('claimStatusId') claimStatusId: string,
    @Args('input') input: AdminUpdateClaimStatusInput,
  ) {
    return this.service.adminUpdateClaimStatus(admin.id, claimStatusId, input)
  }

  @Mutation(() => ClaimStatus, { nullable: true })
  adminDeleteClaimStatus(@CtxUser() admin: User, @Args('claimStatusId') claimStatusId: string) {
    return this.service.adminDeleteClaimStatus(admin.id, claimStatusId)
  }
}

