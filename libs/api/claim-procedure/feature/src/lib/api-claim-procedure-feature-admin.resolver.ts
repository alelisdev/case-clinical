
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateClaimProcedureInput,
  AdminListClaimProcedureInput,
  AdminUpdateClaimProcedureInput,
  ApiClaimProcedureDataAccessAdminService,
  ClaimProcedure
} from '@case-clinical/api/claim-procedure/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPlaceOfServiceInput, PlaceOfService } from '@case-clinical/api/place-of-service/data-access'
import { AdminListClaimStatusInput, ClaimStatus } from '@case-clinical/api/claim-status/data-access'
import { AdminListClaimInput, Claim } from '@case-clinical/api/claim/data-access'
import { AdminListAppointmentInput, Appointment } from '@case-clinical/api/appointment/data-access'
import { AdminListProcedureInput, Procedure } from '@case-clinical/api/procedure/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiClaimProcedureFeatureAdminResolver {
  constructor(private readonly service: ApiClaimProcedureDataAccessAdminService) {}

  @Query(() => [ClaimProcedure], { nullable: true })
  adminClaimProcedures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClaimProcedureInput, nullable: true }) input?: AdminListClaimProcedureInput,
  ) {
    return this.service.adminClaimProcedures(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountClaimProcedures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClaimProcedureInput, nullable: true }) input?: AdminListClaimProcedureInput,
  ) {
    return this.service.adminCountClaimProcedures(admin.id, input)
  }





  @Query(() => ClaimProcedure, { nullable: true })
  adminClaimProcedure(@CtxUser() admin: User, @Args('claimProcedureId') claimProcedureId: string) {
    return this.service.adminClaimProcedure(admin.id, claimProcedureId)
  }

  @Mutation(() => ClaimProcedure, { nullable: true })
  adminCreateClaimProcedure(@CtxUser() admin: User, @Args('input') input: AdminCreateClaimProcedureInput,) {
    return this.service.adminCreateClaimProcedure(admin.id, input)
  }

  @Mutation(() => ClaimProcedure, { nullable: true })
  adminUpdateClaimProcedure(
    @CtxUser() admin: User,
    @Args('claimProcedureId') claimProcedureId: string,
    @Args('input') input: AdminUpdateClaimProcedureInput,
  ) {
    return this.service.adminUpdateClaimProcedure(admin.id, claimProcedureId, input)
  }

  @Mutation(() => ClaimProcedure, { nullable: true })
  adminDeleteClaimProcedure(@CtxUser() admin: User, @Args('claimProcedureId') claimProcedureId: string) {
    return this.service.adminDeleteClaimProcedure(admin.id, claimProcedureId)
  }
}

