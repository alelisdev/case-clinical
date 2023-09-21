
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListMedicalConditionInput,
  ApiMedicalConditionDataAccessPublicService,
  MedicalCondition,
} from '@case-clinical/api/medical-condition/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiMedicalConditionFeaturePublicResolver {
  constructor(private readonly service: ApiMedicalConditionDataAccessPublicService) {}
           
  @Query(() => [MedicalCondition], { nullable: true })
  publicMedicalConditions(
    @Args({ name: 'input', type: () => UserListMedicalConditionInput, nullable: true }) input?: UserListMedicalConditionInput,
  ) {
    return this.service.publicMedicalConditions(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountMedicalConditions(
    @Args({ name: 'input', type: () => UserListMedicalConditionInput, nullable: true }) input?: UserListMedicalConditionInput,
  ) {
    return this.service.publicCountMedicalConditions(input)
  }

  @Query(() => [MedicalCondition], { nullable: true })
  publicSelectMedicalConditions(
    @Args({ name: 'input', type: () => UserListMedicalConditionInput, nullable: true }) input?: UserListMedicalConditionInput,
  ) {
    return this.service.publicSelectMedicalConditions(input)
  }

  @Query(() => MedicalCondition, { nullable: true })
  publicMedicalCondition(@Args('medicalConditionId') medicalConditionId: string) {
    return this.service.publicMedicalCondition(medicalConditionId)
  }
}
