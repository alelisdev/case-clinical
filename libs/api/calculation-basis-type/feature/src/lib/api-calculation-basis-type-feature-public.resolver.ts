
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCalculationBasisTypeInput,
  ApiCalculationBasisTypeDataAccessPublicService,
  CalculationBasisType,
} from '@case-clinical/api/calculation-basis-type/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCalculationBasisTypeFeaturePublicResolver {
  constructor(private readonly service: ApiCalculationBasisTypeDataAccessPublicService) {}
           
  @Query(() => [CalculationBasisType], { nullable: true })
  publicCalculationBasisTypes(
    @Args({ name: 'input', type: () => UserListCalculationBasisTypeInput, nullable: true }) input?: UserListCalculationBasisTypeInput,
  ) {
    return this.service.publicCalculationBasisTypes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCalculationBasisTypes(
    @Args({ name: 'input', type: () => UserListCalculationBasisTypeInput, nullable: true }) input?: UserListCalculationBasisTypeInput,
  ) {
    return this.service.publicCountCalculationBasisTypes(input)
  }

  @Query(() => [CalculationBasisType], { nullable: true })
  publicSelectCalculationBasisTypes(
    @Args({ name: 'input', type: () => UserListCalculationBasisTypeInput, nullable: true }) input?: UserListCalculationBasisTypeInput,
  ) {
    return this.service.publicSelectCalculationBasisTypes(input)
  }

  @Query(() => CalculationBasisType, { nullable: true })
  publicCalculationBasisType(@Args('calculationBasisTypeId') calculationBasisTypeId: string) {
    return this.service.publicCalculationBasisType(calculationBasisTypeId)
  }
}
