
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAdverseInsuranceStatusInput,
  ApiAdverseInsuranceStatusDataAccessPublicService,
  AdverseInsuranceStatus,
} from '@case-clinical/api/adverse-insurance-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAdverseInsuranceStatusFeaturePublicResolver {
  constructor(private readonly service: ApiAdverseInsuranceStatusDataAccessPublicService) {}
           
  @Query(() => [AdverseInsuranceStatus], { nullable: true })
  publicAdverseInsuranceStatuses(
    @Args({ name: 'input', type: () => UserListAdverseInsuranceStatusInput, nullable: true }) input?: UserListAdverseInsuranceStatusInput,
  ) {
    return this.service.publicAdverseInsuranceStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAdverseInsuranceStatuses(
    @Args({ name: 'input', type: () => UserListAdverseInsuranceStatusInput, nullable: true }) input?: UserListAdverseInsuranceStatusInput,
  ) {
    return this.service.publicCountAdverseInsuranceStatuses(input)
  }

  @Query(() => [AdverseInsuranceStatus], { nullable: true })
  publicSelectAdverseInsuranceStatuses(
    @Args({ name: 'input', type: () => UserListAdverseInsuranceStatusInput, nullable: true }) input?: UserListAdverseInsuranceStatusInput,
  ) {
    return this.service.publicSelectAdverseInsuranceStatuses(input)
  }

  @Query(() => AdverseInsuranceStatus, { nullable: true })
  publicAdverseInsuranceStatus(@Args('adverseInsuranceStatusId') adverseInsuranceStatusId: string) {
    return this.service.publicAdverseInsuranceStatus(adverseInsuranceStatusId)
  }
}
