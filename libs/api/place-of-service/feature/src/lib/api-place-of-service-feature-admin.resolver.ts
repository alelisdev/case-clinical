
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePlaceOfServiceInput,
  AdminListPlaceOfServiceInput,
  AdminUpdatePlaceOfServiceInput,
  ApiPlaceOfServiceDataAccessAdminService,
  PlaceOfService
} from '@case-clinical/api/place-of-service/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPlaceOfServiceFeatureAdminResolver {
  constructor(private readonly service: ApiPlaceOfServiceDataAccessAdminService) {}

  @Query(() => [PlaceOfService], { nullable: true })
  adminPlaceOfServices(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPlaceOfServiceInput, nullable: true }) input?: AdminListPlaceOfServiceInput,
  ) {
    return this.service.adminPlaceOfServices(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPlaceOfServices(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPlaceOfServiceInput, nullable: true }) input?: AdminListPlaceOfServiceInput,
  ) {
    return this.service.adminCountPlaceOfServices(admin.id, input)
  }





  @Query(() => PlaceOfService, { nullable: true })
  adminPlaceOfService(@CtxUser() admin: User, @Args('placeOfServiceId') placeOfServiceId: string) {
    return this.service.adminPlaceOfService(admin.id, placeOfServiceId)
  }

  @Mutation(() => PlaceOfService, { nullable: true })
  adminCreatePlaceOfService(@CtxUser() admin: User, @Args('input') input: AdminCreatePlaceOfServiceInput,) {
    return this.service.adminCreatePlaceOfService(admin.id, input)
  }

  @Mutation(() => PlaceOfService, { nullable: true })
  adminUpdatePlaceOfService(
    @CtxUser() admin: User,
    @Args('placeOfServiceId') placeOfServiceId: string,
    @Args('input') input: AdminUpdatePlaceOfServiceInput,
  ) {
    return this.service.adminUpdatePlaceOfService(admin.id, placeOfServiceId, input)
  }

  @Mutation(() => PlaceOfService, { nullable: true })
  adminDeletePlaceOfService(@CtxUser() admin: User, @Args('placeOfServiceId') placeOfServiceId: string) {
    return this.service.adminDeletePlaceOfService(admin.id, placeOfServiceId)
  }
}

