
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListTreatmentInput,
  ApiTreatmentDataAccessPublicService,
  Treatment,
} from '@case-clinical/api/treatment/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiTreatmentFeaturePublicResolver {
  constructor(private readonly service: ApiTreatmentDataAccessPublicService) {}
           
  @Query(() => [Treatment], { nullable: true })
  publicTreatments(
    @Args({ name: 'input', type: () => UserListTreatmentInput, nullable: true }) input?: UserListTreatmentInput,
  ) {
    return this.service.publicTreatments(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountTreatments(
    @Args({ name: 'input', type: () => UserListTreatmentInput, nullable: true }) input?: UserListTreatmentInput,
  ) {
    return this.service.publicCountTreatments(input)
  }

  @Query(() => [Treatment], { nullable: true })
  publicSelectTreatments(
    @Args({ name: 'input', type: () => UserListTreatmentInput, nullable: true }) input?: UserListTreatmentInput,
  ) {
    return this.service.publicSelectTreatments(input)
  }

  @Query(() => Treatment, { nullable: true })
  publicTreatment(@Args('treatmentId') treatmentId: string) {
    return this.service.publicTreatment(treatmentId)
  }
}
