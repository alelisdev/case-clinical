
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAuthorizationInput,
  AdminListAuthorizationInput,
  AdminUpdateAuthorizationInput,
  ApiAuthorizationDataAccessAdminService,
  Authorization
} from '@case-clinical/api/authorization/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'
import { AdminListAuthorizationCategoryInput, AuthorizationCategory } from '@case-clinical/api/authorization-category/data-access'
import { AdminListAuthorizationTypeInput, AuthorizationType } from '@case-clinical/api/authorization-type/data-access'
import { AdminListProcedureInput, Procedure } from '@case-clinical/api/procedure/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAuthorizationFeatureAdminResolver {
  constructor(private readonly service: ApiAuthorizationDataAccessAdminService) {}

  @Query(() => [Authorization], { nullable: true })
  adminAuthorizations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationInput, nullable: true }) input?: AdminListAuthorizationInput,
  ) {
    return this.service.adminAuthorizations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAuthorizations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationInput, nullable: true }) input?: AdminListAuthorizationInput,
  ) {
    return this.service.adminCountAuthorizations(admin.id, input)
  }





  @Query(() => Authorization, { nullable: true })
  adminAuthorization(@CtxUser() admin: User, @Args('authorizationId') authorizationId: string) {
    return this.service.adminAuthorization(admin.id, authorizationId)
  }

  @Mutation(() => Authorization, { nullable: true })
  adminCreateAuthorization(@CtxUser() admin: User, @Args('input') input: AdminCreateAuthorizationInput,) {
    return this.service.adminCreateAuthorization(admin.id, input)
  }

  @Mutation(() => Authorization, { nullable: true })
  adminUpdateAuthorization(
    @CtxUser() admin: User,
    @Args('authorizationId') authorizationId: string,
    @Args('input') input: AdminUpdateAuthorizationInput,
  ) {
    return this.service.adminUpdateAuthorization(admin.id, authorizationId, input)
  }

  @Mutation(() => Authorization, { nullable: true })
  adminDeleteAuthorization(@CtxUser() admin: User, @Args('authorizationId') authorizationId: string) {
    return this.service.adminDeleteAuthorization(admin.id, authorizationId)
  }
}

