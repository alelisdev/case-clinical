
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriorMedsToDateInput,
  AdminListPriorMedsToDateInput,
  AdminUpdatePriorMedsToDateInput,
  ApiPriorMedsToDateDataAccessAdminService,
  PriorMedsToDate
} from '@case-clinical/api/prior-meds-to-date/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'
import { AdminListPriorMedsToDateStatusInput, PriorMedsToDateStatus } from '@case-clinical/api/prior-meds-to-date-status/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPriorMedsToDateFeatureAdminResolver {
  constructor(private readonly service: ApiPriorMedsToDateDataAccessAdminService) {}

  @Query(() => [PriorMedsToDate], { nullable: true })
  adminPriorMedsToDates(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorMedsToDateInput, nullable: true }) input?: AdminListPriorMedsToDateInput,
  ) {
    return this.service.adminPriorMedsToDates(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPriorMedsToDates(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorMedsToDateInput, nullable: true }) input?: AdminListPriorMedsToDateInput,
  ) {
    return this.service.adminCountPriorMedsToDates(admin.id, input)
  }





  @Query(() => PriorMedsToDate, { nullable: true })
  adminPriorMedsToDate(@CtxUser() admin: User, @Args('priorMedsToDateId') priorMedsToDateId: string) {
    return this.service.adminPriorMedsToDate(admin.id, priorMedsToDateId)
  }

  @Mutation(() => PriorMedsToDate, { nullable: true })
  adminCreatePriorMedsToDate(@CtxUser() admin: User, @Args('input') input: AdminCreatePriorMedsToDateInput,) {
    return this.service.adminCreatePriorMedsToDate(admin.id, input)
  }

  @Mutation(() => PriorMedsToDate, { nullable: true })
  adminUpdatePriorMedsToDate(
    @CtxUser() admin: User,
    @Args('priorMedsToDateId') priorMedsToDateId: string,
    @Args('input') input: AdminUpdatePriorMedsToDateInput,
  ) {
    return this.service.adminUpdatePriorMedsToDate(admin.id, priorMedsToDateId, input)
  }

  @Mutation(() => PriorMedsToDate, { nullable: true })
  adminDeletePriorMedsToDate(@CtxUser() admin: User, @Args('priorMedsToDateId') priorMedsToDateId: string) {
    return this.service.adminDeletePriorMedsToDate(admin.id, priorMedsToDateId)
  }
}

