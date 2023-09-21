
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAttorneyStatusInput,
  AdminListAttorneyStatusInput,
  AdminUpdateAttorneyStatusInput,
  ApiAttorneyStatusDataAccessAdminService,
  AttorneyStatus
} from '@case-clinical/api/attorney-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAttorneyStatusFeatureAdminResolver {
  constructor(private readonly service: ApiAttorneyStatusDataAccessAdminService) {}

  @Query(() => [AttorneyStatus], { nullable: true })
  adminAttorneyStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAttorneyStatusInput, nullable: true }) input?: AdminListAttorneyStatusInput,
  ) {
    return this.service.adminAttorneyStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAttorneyStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAttorneyStatusInput, nullable: true }) input?: AdminListAttorneyStatusInput,
  ) {
    return this.service.adminCountAttorneyStatuses(admin.id, input)
  }





  @Query(() => AttorneyStatus, { nullable: true })
  adminAttorneyStatus(@CtxUser() admin: User, @Args('attorneyStatusId') attorneyStatusId: string) {
    return this.service.adminAttorneyStatus(admin.id, attorneyStatusId)
  }

  @Mutation(() => AttorneyStatus, { nullable: true })
  adminCreateAttorneyStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateAttorneyStatusInput,) {
    return this.service.adminCreateAttorneyStatus(admin.id, input)
  }

  @Mutation(() => AttorneyStatus, { nullable: true })
  adminUpdateAttorneyStatus(
    @CtxUser() admin: User,
    @Args('attorneyStatusId') attorneyStatusId: string,
    @Args('input') input: AdminUpdateAttorneyStatusInput,
  ) {
    return this.service.adminUpdateAttorneyStatus(admin.id, attorneyStatusId, input)
  }

  @Mutation(() => AttorneyStatus, { nullable: true })
  adminDeleteAttorneyStatus(@CtxUser() admin: User, @Args('attorneyStatusId') attorneyStatusId: string) {
    return this.service.adminDeleteAttorneyStatus(admin.id, attorneyStatusId)
  }
}

