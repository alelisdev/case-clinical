
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateFirmStatusInput,
  AdminListFirmStatusInput,
  AdminUpdateFirmStatusInput,
  ApiFirmStatusDataAccessAdminService,
  FirmStatus
} from '@case-clinical/api/firm-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiFirmStatusFeatureAdminResolver {
  constructor(private readonly service: ApiFirmStatusDataAccessAdminService) {}

  @Query(() => [FirmStatus], { nullable: true })
  adminFirmStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFirmStatusInput, nullable: true }) input?: AdminListFirmStatusInput,
  ) {
    return this.service.adminFirmStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountFirmStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFirmStatusInput, nullable: true }) input?: AdminListFirmStatusInput,
  ) {
    return this.service.adminCountFirmStatuses(admin.id, input)
  }





  @Query(() => FirmStatus, { nullable: true })
  adminFirmStatus(@CtxUser() admin: User, @Args('firmStatusId') firmStatusId: string) {
    return this.service.adminFirmStatus(admin.id, firmStatusId)
  }

  @Mutation(() => FirmStatus, { nullable: true })
  adminCreateFirmStatus(@CtxUser() admin: User, @Args('input') input: AdminCreateFirmStatusInput,) {
    return this.service.adminCreateFirmStatus(admin.id, input)
  }

  @Mutation(() => FirmStatus, { nullable: true })
  adminUpdateFirmStatus(
    @CtxUser() admin: User,
    @Args('firmStatusId') firmStatusId: string,
    @Args('input') input: AdminUpdateFirmStatusInput,
  ) {
    return this.service.adminUpdateFirmStatus(admin.id, firmStatusId, input)
  }

  @Mutation(() => FirmStatus, { nullable: true })
  adminDeleteFirmStatus(@CtxUser() admin: User, @Args('firmStatusId') firmStatusId: string) {
    return this.service.adminDeleteFirmStatus(admin.id, firmStatusId)
  }
}

