
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAuthorizationStatusInput,
  AdminListAuthorizationStatusInput,
  AdminUpdateAuthorizationStatusInput,
  ApiAuthorizationStatusDataAccessAdminService,
  AuthorizationStatus
} from '@case-clinical/api/authorization-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAuthorizationStatusFeatureAdminResolver {
  constructor(private readonly service: ApiAuthorizationStatusDataAccessAdminService) {}

  @Query(() => [AuthorizationStatus], { nullable: true })
  adminAuthorizationStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationStatusInput, nullable: true }) input?: AdminListAuthorizationStatusInput,
  ) {
    return this.service.adminAuthorizationStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAuthorizationStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAuthorizationStatusInput, nullable: true }) input?: AdminListAuthorizationStatusInput,
  ) {
    return this.service.adminCountAuthorizationStatuses(admin.id, input)
  }





  @Query(() => AuthorizationStatus, { nullable: true })
  adminAuthorizationStatus(@CtxUser() admin: User, @Args('authorizationStatusId') authorizationStatusId: string) {
    return this.service.adminAuthorizationStatus(admin.id, authorizationStatusId)
  }

  @Mutation(() => AuthorizationStatus, { nullable: true })
  adminCreateAuthorizationStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateAuthorizationStatusInput,) {
    return this.service.adminCreateAuthorizationStatus(admin.id, input)
  }

  @Mutation(() => AuthorizationStatus, { nullable: true })
  adminUpdateAuthorizationStatus(
    @CtxUser() admin: User,
    @Args('authorizationStatusId') authorizationStatusId: string,
    @Args('input') input: AdminUpdateAuthorizationStatusInput,
  ) {
    return this.service.adminUpdateAuthorizationStatus(admin.id, authorizationStatusId, input)
  }

  @Mutation(() => AuthorizationStatus, { nullable: true })
  adminDeleteAuthorizationStatus(@CtxUser() admin: User, @Args('authorizationStatusId') authorizationStatusId: string) {
    return this.service.adminDeleteAuthorizationStatus(admin.id, authorizationStatusId)
  }
}

