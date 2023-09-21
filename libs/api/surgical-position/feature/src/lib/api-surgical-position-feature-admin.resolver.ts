
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateSurgicalPositionInput,
  AdminListSurgicalPositionInput,
  AdminUpdateSurgicalPositionInput,
  ApiSurgicalPositionDataAccessAdminService,
  SurgicalPosition
} from '@case-clinical/api/surgical-position/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiSurgicalPositionFeatureAdminResolver {
  constructor(private readonly service: ApiSurgicalPositionDataAccessAdminService) {}

  @Query(() => [SurgicalPosition], { nullable: true })
  adminSurgicalPositions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSurgicalPositionInput, nullable: true }) input?: AdminListSurgicalPositionInput,
  ) {
    return this.service.adminSurgicalPositions(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountSurgicalPositions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSurgicalPositionInput, nullable: true }) input?: AdminListSurgicalPositionInput,
  ) {
    return this.service.adminCountSurgicalPositions(admin.id, input)
  }





  @Query(() => SurgicalPosition, { nullable: true })
  adminSurgicalPosition(@CtxUser() admin: User, @Args('surgicalPositionId') surgicalPositionId: string) {
    return this.service.adminSurgicalPosition(admin.id, surgicalPositionId)
  }

  @Mutation(() => SurgicalPosition, { nullable: true })
  adminCreateSurgicalPosition(@CtxUser() admin: User, @Args('input') input: AdminCreateSurgicalPositionInput,) {
    return this.service.adminCreateSurgicalPosition(admin.id, input)
  }

  @Mutation(() => SurgicalPosition, { nullable: true })
  adminUpdateSurgicalPosition(
    @CtxUser() admin: User,
    @Args('surgicalPositionId') surgicalPositionId: string,
    @Args('input') input: AdminUpdateSurgicalPositionInput,
  ) {
    return this.service.adminUpdateSurgicalPosition(admin.id, surgicalPositionId, input)
  }

  @Mutation(() => SurgicalPosition, { nullable: true })
  adminDeleteSurgicalPosition(@CtxUser() admin: User, @Args('surgicalPositionId') surgicalPositionId: string) {
    return this.service.adminDeleteSurgicalPosition(admin.id, surgicalPositionId)
  }
}

