
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateRequestAdditionalVisitInput,
  AdminListRequestAdditionalVisitInput,
  AdminUpdateRequestAdditionalVisitInput,
  ApiRequestAdditionalVisitDataAccessAdminService,
  RequestAdditionalVisit
} from '@case-clinical/api/request-additional-visit/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiRequestAdditionalVisitFeatureAdminResolver {
  constructor(private readonly service: ApiRequestAdditionalVisitDataAccessAdminService) {}

  @Query(() => [RequestAdditionalVisit], { nullable: true })
  adminRequestAdditionalVisits(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRequestAdditionalVisitInput, nullable: true }) input?: AdminListRequestAdditionalVisitInput,
  ) {
    return this.service.adminRequestAdditionalVisits(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountRequestAdditionalVisits(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRequestAdditionalVisitInput, nullable: true }) input?: AdminListRequestAdditionalVisitInput,
  ) {
    return this.service.adminCountRequestAdditionalVisits(admin.id, input)
  }





  @Query(() => RequestAdditionalVisit, { nullable: true })
  adminRequestAdditionalVisit(@CtxUser() admin: User, @Args('requestAdditionalVisitId') requestAdditionalVisitId: string) {
    return this.service.adminRequestAdditionalVisit(admin.id, requestAdditionalVisitId)
  }

  @Mutation(() => RequestAdditionalVisit, { nullable: true })
  adminCreateRequestAdditionalVisit(@CtxUser() admin: User, @Args('input') input: AdminCreateRequestAdditionalVisitInput,) {
    return this.service.adminCreateRequestAdditionalVisit(admin.id, input)
  }

  @Mutation(() => RequestAdditionalVisit, { nullable: true })
  adminUpdateRequestAdditionalVisit(
    @CtxUser() admin: User,
    @Args('requestAdditionalVisitId') requestAdditionalVisitId: string,
    @Args('input') input: AdminUpdateRequestAdditionalVisitInput,
  ) {
    return this.service.adminUpdateRequestAdditionalVisit(admin.id, requestAdditionalVisitId, input)
  }

  @Mutation(() => RequestAdditionalVisit, { nullable: true })
  adminDeleteRequestAdditionalVisit(@CtxUser() admin: User, @Args('requestAdditionalVisitId') requestAdditionalVisitId: string) {
    return this.service.adminDeleteRequestAdditionalVisit(admin.id, requestAdditionalVisitId)
  }
}

