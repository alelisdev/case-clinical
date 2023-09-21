
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListInsuranceTypeInput,
  ApiInsuranceTypeDataAccessPublicService,
  InsuranceType,
} from '@case-clinical/api/insurance-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiInsuranceTypeFeaturePublicResolver {
  constructor(private readonly service: ApiInsuranceTypeDataAccessPublicService) {}
           
  @Query(() => [InsuranceType], { nullable: true })
  publicInsuranceTypes(
    @Args({ name: 'input', type: () => UserListInsuranceTypeInput, nullable: true }) input?: UserListInsuranceTypeInput,
  ) {
    return this.service.publicInsuranceTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountInsuranceTypes(
    @Args({ name: 'input', type: () => UserListInsuranceTypeInput, nullable: true }) input?: UserListInsuranceTypeInput,
  ) {
    return this.service.publicCountInsuranceTypes(input)
  }

  @Query(() => [InsuranceType], { nullable: true })
  publicSelectInsuranceTypes(
    @Args({ name: 'input', type: () => UserListInsuranceTypeInput, nullable: true }) input?: UserListInsuranceTypeInput,
  ) {
    return this.service.publicSelectInsuranceTypes(input)
  }

  @Query(() => InsuranceType, { nullable: true })
  publicInsuranceType(@Args('insuranceTypeId') insuranceTypeId: string) {
    return this.service.publicInsuranceType(insuranceTypeId)
  }
}
