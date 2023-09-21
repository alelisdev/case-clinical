
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAuthorizationTypeInput,
  AdminListAuthorizationTypeInput,
  AdminUpdateAuthorizationTypeInput,
  ApiAuthorizationTypeDataAccessAdminService,
  AuthorizationType
} from '@case-clinical/api/authorization-type/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAuthorizationTypeFeatureAdminResolver {
  constructor(private readonly service: ApiAuthorizationTypeDataAccessAdminService) {}

  @Query(() => [AuthorizationType], { nullable: true })
  adminAuthorizationTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationTypeInput, nullable: true }) input?: AdminListAuthorizationTypeInput,
  ) {
    return this.service.adminAuthorizationTypes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAuthorizationTypes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationTypeInput, nullable: true }) input?: AdminListAuthorizationTypeInput,
  ) {
    return this.service.adminCountAuthorizationTypes(admin.id, input)
  }





  @Query(() => AuthorizationType, { nullable: true })
  adminAuthorizationType(@CtxUser() admin: User, @Args('authorizationTypeId') authorizationTypeId: string) {
    return this.service.adminAuthorizationType(admin.id, authorizationTypeId)
  }

  @Mutation(() => AuthorizationType, { nullable: true })
  adminCreateAuthorizationType(@CtxUser() admin: User, @Args('input') input: AdminCreateAuthorizationTypeInput,) {
    return this.service.adminCreateAuthorizationType(admin.id, input)
  }

  @Mutation(() => AuthorizationType, { nullable: true })
  adminUpdateAuthorizationType(
    @CtxUser() admin: User,
    @Args('authorizationTypeId') authorizationTypeId: string,
    @Args('input') input: AdminUpdateAuthorizationTypeInput,
  ) {
    return this.service.adminUpdateAuthorizationType(admin.id, authorizationTypeId, input)
  }

  @Mutation(() => AuthorizationType, { nullable: true })
  adminDeleteAuthorizationType(@CtxUser() admin: User, @Args('authorizationTypeId') authorizationTypeId: string) {
    return this.service.adminDeleteAuthorizationType(admin.id, authorizationTypeId)
  }
}

