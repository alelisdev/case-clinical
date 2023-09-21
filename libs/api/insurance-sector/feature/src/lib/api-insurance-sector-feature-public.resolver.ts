
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListInsuranceSectorInput,
  ApiInsuranceSectorDataAccessPublicService,
  InsuranceSector,
} from '@case-clinical/api/insurance-sector/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiInsuranceSectorFeaturePublicResolver {
  constructor(private readonly service: ApiInsuranceSectorDataAccessPublicService) {}
           
  @Query(() => [InsuranceSector], { nullable: true })
  publicInsuranceSectors(
    @Args({ name: 'input', type: () => UserListInsuranceSectorInput, nullable: true }) input?: UserListInsuranceSectorInput,
  ) {
    return this.service.publicInsuranceSectors(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountInsuranceSectors(
    @Args({ name: 'input', type: () => UserListInsuranceSectorInput, nullable: true }) input?: UserListInsuranceSectorInput,
  ) {
    return this.service.publicCountInsuranceSectors(input)
  }

  @Query(() => [InsuranceSector], { nullable: true })
  publicSelectInsuranceSectors(
    @Args({ name: 'input', type: () => UserListInsuranceSectorInput, nullable: true }) input?: UserListInsuranceSectorInput,
  ) {
    return this.service.publicSelectInsuranceSectors(input)
  }

  @Query(() => InsuranceSector, { nullable: true })
  publicInsuranceSector(@Args('insuranceSectorId') insuranceSectorId: string) {
    return this.service.publicInsuranceSector(insuranceSectorId)
  }
}
