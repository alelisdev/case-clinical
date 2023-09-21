
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateNavigationInput,
  AdminListNavigationInput,
  AdminUpdateNavigationInput,
  ApiNavigationDataAccessAdminService,
  Navigation,
  RoleNavigation,
  AdminListRoleNavigationInput,
  AdminUpdateRoleNavigationInput,
} from '@case-clinical/api/navigation/data-access'
import { User } from '@case-clinical/api/user/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiNavigationFeatureAdminResolver {
  constructor(private readonly service: ApiNavigationDataAccessAdminService) {}

  @Query(() => [RoleNavigation], { nullable: true })
  adminRoleNavigations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListRoleNavigationInput, nullable: true }) input?: AdminListRoleNavigationInput,
  ) {
    return this.service.adminRoleNavigations(admin.id, input)
  }

  @Mutation(() => RoleNavigation, { nullable: true })
  adminUpdateRoleNavigation(
    @CtxUser() admin: User,
    @Args('roleNavigationId') roleNavigationId: string,
    @Args('input') input: AdminUpdateRoleNavigationInput,
  ) {
    return this.service.adminUpdateRoleNavigation(admin.id, roleNavigationId, input)
  }

  @Query(() => [Navigation], { nullable: true })
  adminNavigations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNavigationInput, nullable: true }) input?: AdminListNavigationInput,
  ) {
    return this.service.adminNavigations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountNavigations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNavigationInput, nullable: true }) input?: AdminListNavigationInput,
  ) {
    return this.service.adminCountNavigations(admin.id, input)
  }

  @Query(() => Navigation, { nullable: true })
  adminNavigation(@CtxUser() admin: User, @Args('navigationId') navigationId: string) {
    return this.service.adminNavigation(admin.id, navigationId)
  }

  @Mutation(() => Navigation, { nullable: true })
  adminCreateNavigation(@CtxUser() admin: User, @Args('input') input: AdminCreateNavigationInput,) {
    return this.service.adminCreateNavigation(admin.id, input)
  }

  @Mutation(() => Navigation, { nullable: true })
  adminUpdateNavigation(
    @CtxUser() admin: User,
    @Args('navigationId') navigationId: string,
    @Args('input') input: AdminUpdateNavigationInput,
  ) {
    return this.service.adminUpdateNavigation(admin.id, navigationId, input)
  }

  @Mutation(() => Navigation, { nullable: true })
  adminDeleteNavigation(@CtxUser() admin: User, @Args('navigationId') navigationId: string) {
    return this.service.adminDeleteNavigation(admin.id, navigationId)
  }
}

