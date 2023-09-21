
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateSideInput,
  AdminListSideInput,
  AdminUpdateSideInput,
  ApiSideDataAccessAdminService,
  Side
} from '@case-clinical/api/side/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiSideFeatureAdminResolver {
  constructor(private readonly service: ApiSideDataAccessAdminService) {}

  @Query(() => [Side], { nullable: true })
  adminSides(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSideInput, nullable: true }) input?: AdminListSideInput,
  ) {
    return this.service.adminSides(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountSides(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSideInput, nullable: true }) input?: AdminListSideInput,
  ) {
    return this.service.adminCountSides(admin.id, input)
  }





  @Query(() => Side, { nullable: true })
  adminSide(@CtxUser() admin: User, @Args('sideId') sideId: string) {
    return this.service.adminSide(admin.id, sideId)
  }

  @Mutation(() => Side, { nullable: true })
  adminCreateSide(@CtxUser() admin: User, @Args('input') input: AdminCreateSideInput,) {
    return this.service.adminCreateSide(admin.id, input)
  }

  @Mutation(() => Side, { nullable: true })
  adminUpdateSide(
    @CtxUser() admin: User,
    @Args('sideId') sideId: string,
    @Args('input') input: AdminUpdateSideInput,
  ) {
    return this.service.adminUpdateSide(admin.id, sideId, input)
  }

  @Mutation(() => Side, { nullable: true })
  adminDeleteSide(@CtxUser() admin: User, @Args('sideId') sideId: string) {
    return this.service.adminDeleteSide(admin.id, sideId)
  }
}

