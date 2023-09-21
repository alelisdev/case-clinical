
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListManufacturerInput,
  ApiManufacturerDataAccessPublicService,
  Manufacturer,
} from '@case-clinical/api/manufacturer/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiManufacturerFeaturePublicResolver {
  constructor(private readonly service: ApiManufacturerDataAccessPublicService) {}
           
  @Query(() => [Manufacturer], { nullable: true })
  publicManufacturers(
    @Args({ name: 'input', type: () => UserListManufacturerInput, nullable: true }) input?: UserListManufacturerInput,
  ) {
    return this.service.publicManufacturers(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountManufacturers(
    @Args({ name: 'input', type: () => UserListManufacturerInput, nullable: true }) input?: UserListManufacturerInput,
  ) {
    return this.service.publicCountManufacturers(input)
  }

  @Query(() => [Manufacturer], { nullable: true })
  publicSelectManufacturers(
    @Args({ name: 'input', type: () => UserListManufacturerInput, nullable: true }) input?: UserListManufacturerInput,
  ) {
    return this.service.publicSelectManufacturers(input)
  }

  @Query(() => Manufacturer, { nullable: true })
  publicManufacturer(@Args('manufacturerId') manufacturerId: string) {
    return this.service.publicManufacturer(manufacturerId)
  }
}
