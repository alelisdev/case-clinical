
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAttorneyInput,
  AdminListAttorneyInput,
  AdminUpdateAttorneyInput,
  ApiAttorneyDataAccessAdminService,
  Attorney
} from '@case-clinical/api/attorney/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListFirmInput, Firm } from '@case-clinical/api/firm/data-access'
import { AdminListAttorneyStatusInput, AttorneyStatus } from '@case-clinical/api/attorney-status/data-access'
import { AdminListAttorneyTypeInput, AttorneyType } from '@case-clinical/api/attorney-type/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAttorneyFeatureAdminResolver {
  constructor(private readonly service: ApiAttorneyDataAccessAdminService) {}

  @Query(() => [Attorney], { nullable: true })
  adminAttorneys(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAttorneyInput, nullable: true }) input?: AdminListAttorneyInput,
  ) {
    return this.service.adminAttorneys(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAttorneys(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAttorneyInput, nullable: true }) input?: AdminListAttorneyInput,
  ) {
    return this.service.adminCountAttorneys(admin.id, input)
  }





  @Query(() => Attorney, { nullable: true })
  adminAttorney(@CtxUser() admin: User, @Args('attorneyId') attorneyId: string) {
    return this.service.adminAttorney(admin.id, attorneyId)
  }

  @Mutation(() => Attorney, { nullable: true })
  adminCreateAttorney(@CtxUser() admin: User, @Args('input') input: AdminCreateAttorneyInput,) {
    return this.service.adminCreateAttorney(admin.id, input)
  }

  @Mutation(() => Attorney, { nullable: true })
  adminUpdateAttorney(
    @CtxUser() admin: User,
    @Args('attorneyId') attorneyId: string,
    @Args('input') input: AdminUpdateAttorneyInput,
  ) {
    return this.service.adminUpdateAttorney(admin.id, attorneyId, input)
  }

  @Mutation(() => Attorney, { nullable: true })
  adminDeleteAttorney(@CtxUser() admin: User, @Args('attorneyId') attorneyId: string) {
    return this.service.adminDeleteAttorney(admin.id, attorneyId)
  }
}

