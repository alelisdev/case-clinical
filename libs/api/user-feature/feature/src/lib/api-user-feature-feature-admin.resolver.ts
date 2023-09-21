
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateUserFeatureInput,
  AdminListUserFeatureInput,
  AdminUpdateUserFeatureInput,
  ApiUserFeatureDataAccessAdminService,
  UserFeature
} from '@case-clinical/api/user-feature/data-access'


import { AdminListFeatureInput, Feature } from '@case-clinical/api/feature/data-access'
import { AdminListUserInput, User } from '@case-clinical/api/user/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiUserFeatureFeatureAdminResolver {
  constructor(private readonly service: ApiUserFeatureDataAccessAdminService) {}

  @Query(() => [UserFeature], { nullable: true })
  adminUserFeatures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserFeatureInput, nullable: true }) input?: AdminListUserFeatureInput,
  ) {
    return this.service.adminUserFeatures(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountUserFeatures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserFeatureInput, nullable: true }) input?: AdminListUserFeatureInput,
  ) {
    return this.service.adminCountUserFeatures(admin.id, input)
  }





  @Query(() => UserFeature, { nullable: true })
  adminUserFeature(@CtxUser() admin: User, @Args('userFeatureId') userFeatureId: string) {
    return this.service.adminUserFeature(admin.id, userFeatureId)
  }

  @Mutation(() => UserFeature, { nullable: true })
  adminCreateUserFeature(@CtxUser() admin: User, @Args('input') input: AdminCreateUserFeatureInput,) {
    return this.service.adminCreateUserFeature(admin.id, input)
  }

  @Mutation(() => UserFeature, { nullable: true })
  adminUpdateUserFeature(
    @CtxUser() admin: User,
    @Args('userFeatureId') userFeatureId: string,
    @Args('input') input: AdminUpdateUserFeatureInput,
  ) {
    return this.service.adminUpdateUserFeature(admin.id, userFeatureId, input)
  }

  @Mutation(() => UserFeature, { nullable: true })
  adminDeleteUserFeature(@CtxUser() admin: User, @Args('userFeatureId') userFeatureId: string) {
    return this.service.adminDeleteUserFeature(admin.id, userFeatureId)
  }
}

