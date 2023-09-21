
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateServiceInput,
  AdminListServiceInput,
  AdminUpdateServiceInput,
  ApiServiceDataAccessAdminService,
  Service
} from '@case-clinical/api/service/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiServiceFeatureAdminResolver {
  constructor(private readonly service: ApiServiceDataAccessAdminService) {}

  @Query(() => [Service], { nullable: true })
  adminServices(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListServiceInput, nullable: true }) input?: AdminListServiceInput,
  ) {
    return this.service.adminServices(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountServices(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListServiceInput, nullable: true }) input?: AdminListServiceInput,
  ) {
    return this.service.adminCountServices(admin.id, input)
  }





  @Query(() => Service, { nullable: true })
  adminService(@CtxUser() admin: User, @Args('serviceId') serviceId: string) {
    return this.service.adminService(admin.id, serviceId)
  }

  @Mutation(() => Service, { nullable: true })
  adminCreateService(@CtxUser() admin: User, @Args('input') input: AdminCreateServiceInput,) {
    return this.service.adminCreateService(admin.id, input)
  }

  @Mutation(() => Service, { nullable: true })
  adminUpdateService(
    @CtxUser() admin: User,
    @Args('serviceId') serviceId: string,
    @Args('input') input: AdminUpdateServiceInput,
  ) {
    return this.service.adminUpdateService(admin.id, serviceId, input)
  }

  @Mutation(() => Service, { nullable: true })
  adminDeleteService(@CtxUser() admin: User, @Args('serviceId') serviceId: string) {
    return this.service.adminDeleteService(admin.id, serviceId)
  }
}

