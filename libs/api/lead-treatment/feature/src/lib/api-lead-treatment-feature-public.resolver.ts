
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListLeadTreatmentInput,
  ApiLeadTreatmentDataAccessPublicService,
  LeadTreatment,
} from '@case-clinical/api/lead-treatment/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiLeadTreatmentFeaturePublicResolver {
  constructor(private readonly service: ApiLeadTreatmentDataAccessPublicService) {}
           
  @Query(() => [LeadTreatment], { nullable: true })
  publicLeadTreatments(
    @Args({ name: 'input', type: () => UserListLeadTreatmentInput, nullable: true }) input?: UserListLeadTreatmentInput,
  ) {
    return this.service.publicLeadTreatments(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountLeadTreatments(
    @Args({ name: 'input', type: () => UserListLeadTreatmentInput, nullable: true }) input?: UserListLeadTreatmentInput,
  ) {
    return this.service.publicCountLeadTreatments(input)
  }

  @Query(() => [LeadTreatment], { nullable: true })
  publicSelectLeadTreatments(
    @Args({ name: 'input', type: () => UserListLeadTreatmentInput, nullable: true }) input?: UserListLeadTreatmentInput,
  ) {
    return this.service.publicSelectLeadTreatments(input)
  }

  @Query(() => LeadTreatment, { nullable: true })
  publicLeadTreatment(@Args('leadTreatmentId') leadTreatmentId: string) {
    return this.service.publicLeadTreatment(leadTreatmentId)
  }
}
