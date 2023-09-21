
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateFeatureInput,
  AdminListFeatureInput,
  AdminUpdateFeatureInput,
  ApiFeatureDataAccessAdminService,
  Feature
} from '@case-clinical/api/feature/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiFeatureFeatureAdminResolver {
  constructor(private readonly service: ApiFeatureDataAccessAdminService) {}

  @Query(() => [Feature], { nullable: true })
  adminFeatures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFeatureInput, nullable: true }) input?: AdminListFeatureInput,
  ) {
    return this.service.adminFeatures(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountFeatures(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFeatureInput, nullable: true }) input?: AdminListFeatureInput,
  ) {
    return this.service.adminCountFeatures(admin.id, input)
  }





  @Query(() => Feature, { nullable: true })
  adminFeature(@CtxUser() admin: User, @Args('featureId') featureId: string) {
    return this.service.adminFeature(admin.id, featureId)
  }

  @Mutation(() => Feature, { nullable: true })
  adminCreateFeature(@CtxUser() admin: User, @Args('input') input: AdminCreateFeatureInput,) {
    return this.service.adminCreateFeature(admin.id, input)
  }

  @Mutation(() => Feature, { nullable: true })
  adminUpdateFeature(
    @CtxUser() admin: User,
    @Args('featureId') featureId: string,
    @Args('input') input: AdminUpdateFeatureInput,
  ) {
    return this.service.adminUpdateFeature(admin.id, featureId, input)
  }

  @Mutation(() => Feature, { nullable: true })
  adminDeleteFeature(@CtxUser() admin: User, @Args('featureId') featureId: string) {
    return this.service.adminDeleteFeature(admin.id, featureId)
  }
}

