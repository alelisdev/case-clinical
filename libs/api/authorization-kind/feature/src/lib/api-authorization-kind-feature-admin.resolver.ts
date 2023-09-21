
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAuthorizationKindInput,
  AdminListAuthorizationKindInput,
  AdminUpdateAuthorizationKindInput,
  ApiAuthorizationKindDataAccessAdminService,
  AuthorizationKind
} from '@case-clinical/api/authorization-kind/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListCategoryInput, Category } from '@case-clinical/api/category/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAuthorizationKindFeatureAdminResolver {
  constructor(private readonly service: ApiAuthorizationKindDataAccessAdminService) {}

  @Query(() => [AuthorizationKind], { nullable: true })
  adminAuthorizationKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationKindInput, nullable: true }) input?: AdminListAuthorizationKindInput,
  ) {
    return this.service.adminAuthorizationKinds(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAuthorizationKinds(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationKindInput, nullable: true }) input?: AdminListAuthorizationKindInput,
  ) {
    return this.service.adminCountAuthorizationKinds(admin.id, input)
  }





  @Query(() => AuthorizationKind, { nullable: true })
  adminAuthorizationKind(@CtxUser() admin: User, @Args('authorizationKindId') authorizationKindId: string) {
    return this.service.adminAuthorizationKind(admin.id, authorizationKindId)
  }

  @Mutation(() => AuthorizationKind, { nullable: true })
  adminCreateAuthorizationKind(@CtxUser() admin: User, @Args('input') input: AdminCreateAuthorizationKindInput,) {
    return this.service.adminCreateAuthorizationKind(admin.id, input)
  }

  @Mutation(() => AuthorizationKind, { nullable: true })
  adminUpdateAuthorizationKind(
    @CtxUser() admin: User,
    @Args('authorizationKindId') authorizationKindId: string,
    @Args('input') input: AdminUpdateAuthorizationKindInput,
  ) {
    return this.service.adminUpdateAuthorizationKind(admin.id, authorizationKindId, input)
  }

  @Mutation(() => AuthorizationKind, { nullable: true })
  adminDeleteAuthorizationKind(@CtxUser() admin: User, @Args('authorizationKindId') authorizationKindId: string) {
    return this.service.adminDeleteAuthorizationKind(admin.id, authorizationKindId)
  }
}

