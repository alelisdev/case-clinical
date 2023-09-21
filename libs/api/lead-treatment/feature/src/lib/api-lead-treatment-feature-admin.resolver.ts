
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateLeadTreatmentInput,
  AdminListLeadTreatmentInput,
  AdminUpdateLeadTreatmentInput,
  ApiLeadTreatmentDataAccessAdminService,
  LeadTreatment
} from '@case-clinical/api/lead-treatment/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLeadInput, Lead } from '@case-clinical/api/lead/data-access'
import { AdminListTreatmentInput, Treatment } from '@case-clinical/api/treatment/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiLeadTreatmentFeatureAdminResolver {
  constructor(private readonly service: ApiLeadTreatmentDataAccessAdminService) {}

  @Query(() => [LeadTreatment], { nullable: true })
  adminLeadTreatments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadTreatmentInput, nullable: true }) input?: AdminListLeadTreatmentInput,
  ) {
    return this.service.adminLeadTreatments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountLeadTreatments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadTreatmentInput, nullable: true }) input?: AdminListLeadTreatmentInput,
  ) {
    return this.service.adminCountLeadTreatments(admin.id, input)
  }





  @Query(() => LeadTreatment, { nullable: true })
  adminLeadTreatment(@CtxUser() admin: User, @Args('leadTreatmentId') leadTreatmentId: string) {
    return this.service.adminLeadTreatment(admin.id, leadTreatmentId)
  }

  @Mutation(() => LeadTreatment, { nullable: true })
  adminCreateLeadTreatment(@CtxUser() admin: User, @Args('input') input: AdminCreateLeadTreatmentInput,) {
    return this.service.adminCreateLeadTreatment(admin.id, input)
  }

  @Mutation(() => LeadTreatment, { nullable: true })
  adminUpdateLeadTreatment(
    @CtxUser() admin: User,
    @Args('leadTreatmentId') leadTreatmentId: string,
    @Args('input') input: AdminUpdateLeadTreatmentInput,
  ) {
    return this.service.adminUpdateLeadTreatment(admin.id, leadTreatmentId, input)
  }

  @Mutation(() => LeadTreatment, { nullable: true })
  adminDeleteLeadTreatment(@CtxUser() admin: User, @Args('leadTreatmentId') leadTreatmentId: string) {
    return this.service.adminDeleteLeadTreatment(admin.id, leadTreatmentId)
  }
}

