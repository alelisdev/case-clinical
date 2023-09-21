
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateManufacturerInput,
  AdminListManufacturerInput,
  AdminUpdateManufacturerInput,
  ApiManufacturerDataAccessAdminService,
  Manufacturer
} from '@case-clinical/api/manufacturer/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiManufacturerFeatureAdminResolver {
  constructor(private readonly service: ApiManufacturerDataAccessAdminService) {}

  @Query(() => [Manufacturer], { nullable: true })
  adminManufacturers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListManufacturerInput, nullable: true }) input?: AdminListManufacturerInput,
  ) {
    return this.service.adminManufacturers(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountManufacturers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListManufacturerInput, nullable: true }) input?: AdminListManufacturerInput,
  ) {
    return this.service.adminCountManufacturers(admin.id, input)
  }





  @Query(() => Manufacturer, { nullable: true })
  adminManufacturer(@CtxUser() admin: User, @Args('manufacturerId') manufacturerId: string) {
    return this.service.adminManufacturer(admin.id, manufacturerId)
  }

  @Mutation(() => Manufacturer, { nullable: true })
  adminCreateManufacturer(@CtxUser() admin: User, @Args('input') input: AdminCreateManufacturerInput,) {
    return this.service.adminCreateManufacturer(admin.id, input)
  }

  @Mutation(() => Manufacturer, { nullable: true })
  adminUpdateManufacturer(
    @CtxUser() admin: User,
    @Args('manufacturerId') manufacturerId: string,
    @Args('input') input: AdminUpdateManufacturerInput,
  ) {
    return this.service.adminUpdateManufacturer(admin.id, manufacturerId, input)
  }

  @Mutation(() => Manufacturer, { nullable: true })
  adminDeleteManufacturer(@CtxUser() admin: User, @Args('manufacturerId') manufacturerId: string) {
    return this.service.adminDeleteManufacturer(admin.id, manufacturerId)
  }
}

