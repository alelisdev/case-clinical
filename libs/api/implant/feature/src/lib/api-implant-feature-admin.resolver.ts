
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateImplantInput,
  AdminListImplantInput,
  AdminUpdateImplantInput,
  ApiImplantDataAccessAdminService,
  Implant
} from '@case-clinical/api/implant/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListImplantCategoryInput, ImplantCategory } from '@case-clinical/api/implant-category/data-access'
import { AdminListContactInput, Contact } from '@case-clinical/api/contact/data-access'
import { AdminListManufacturerInput, Manufacturer } from '@case-clinical/api/manufacturer/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiImplantFeatureAdminResolver {
  constructor(private readonly service: ApiImplantDataAccessAdminService) {}

  @Query(() => [Implant], { nullable: true })
  adminImplants(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListImplantInput, nullable: true }) input?: AdminListImplantInput,
  ) {
    return this.service.adminImplants(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountImplants(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListImplantInput, nullable: true }) input?: AdminListImplantInput,
  ) {
    return this.service.adminCountImplants(admin.id, input)
  }





  @Query(() => Implant, { nullable: true })
  adminImplant(@CtxUser() admin: User, @Args('implantId') implantId: string) {
    return this.service.adminImplant(admin.id, implantId)
  }

  @Mutation(() => Implant, { nullable: true })
  adminCreateImplant(@CtxUser() admin: User, @Args('input') input: AdminCreateImplantInput,) {
    return this.service.adminCreateImplant(admin.id, input)
  }

  @Mutation(() => Implant, { nullable: true })
  adminUpdateImplant(
    @CtxUser() admin: User,
    @Args('implantId') implantId: string,
    @Args('input') input: AdminUpdateImplantInput,
  ) {
    return this.service.adminUpdateImplant(admin.id, implantId, input)
  }

  @Mutation(() => Implant, { nullable: true })
  adminDeleteImplant(@CtxUser() admin: User, @Args('implantId') implantId: string) {
    return this.service.adminDeleteImplant(admin.id, implantId)
  }
}

