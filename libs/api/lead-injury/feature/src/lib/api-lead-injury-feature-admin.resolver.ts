
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateLeadInjuryInput,
  AdminListLeadInjuryInput,
  AdminUpdateLeadInjuryInput,
  ApiLeadInjuryDataAccessAdminService,
  LeadInjury
} from '@case-clinical/api/lead-injury/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListLeadInput, Lead } from '@case-clinical/api/lead/data-access'
import { AdminListSeverityInput, Severity } from '@case-clinical/api/severity/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiLeadInjuryFeatureAdminResolver {
  constructor(private readonly service: ApiLeadInjuryDataAccessAdminService) {}

  @Query(() => [LeadInjury], { nullable: true })
  adminLeadInjuries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadInjuryInput, nullable: true }) input?: AdminListLeadInjuryInput,
  ) {
    return this.service.adminLeadInjuries(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountLeadInjuries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLeadInjuryInput, nullable: true }) input?: AdminListLeadInjuryInput,
  ) {
    return this.service.adminCountLeadInjuries(admin.id, input)
  }





  @Query(() => LeadInjury, { nullable: true })
  adminLeadInjury(@CtxUser() admin: User, @Args('leadInjuryId') leadInjuryId: string) {
    return this.service.adminLeadInjury(admin.id, leadInjuryId)
  }

  @Mutation(() => LeadInjury, { nullable: true })
  adminCreateLeadInjury(@CtxUser() admin: User, @Args('input') input: AdminCreateLeadInjuryInput,) {
    return this.service.adminCreateLeadInjury(admin.id, input)
  }

  @Mutation(() => LeadInjury, { nullable: true })
  adminUpdateLeadInjury(
    @CtxUser() admin: User,
    @Args('leadInjuryId') leadInjuryId: string,
    @Args('input') input: AdminUpdateLeadInjuryInput,
  ) {
    return this.service.adminUpdateLeadInjury(admin.id, leadInjuryId, input)
  }

  @Mutation(() => LeadInjury, { nullable: true })
  adminDeleteLeadInjury(@CtxUser() admin: User, @Args('leadInjuryId') leadInjuryId: string) {
    return this.service.adminDeleteLeadInjury(admin.id, leadInjuryId)
  }
}

