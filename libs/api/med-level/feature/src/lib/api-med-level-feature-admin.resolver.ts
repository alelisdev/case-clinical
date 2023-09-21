
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateMedLevelInput,
  AdminListMedLevelInput,
  AdminUpdateMedLevelInput,
  ApiMedLevelDataAccessAdminService,
  MedLevel
} from '@case-clinical/api/med-level/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiMedLevelFeatureAdminResolver {
  constructor(private readonly service: ApiMedLevelDataAccessAdminService) {}

  @Query(() => [MedLevel], { nullable: true })
  adminMedLevels(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedLevelInput, nullable: true }) input?: AdminListMedLevelInput,
  ) {
    return this.service.adminMedLevels(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountMedLevels(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedLevelInput, nullable: true }) input?: AdminListMedLevelInput,
  ) {
    return this.service.adminCountMedLevels(admin.id, input)
  }





  @Query(() => MedLevel, { nullable: true })
  adminMedLevel(@CtxUser() admin: User, @Args('medLevelId') medLevelId: string) {
    return this.service.adminMedLevel(admin.id, medLevelId)
  }

  @Mutation(() => MedLevel, { nullable: true })
  adminCreateMedLevel(@CtxUser() admin: User, @Args('input') input: AdminCreateMedLevelInput,) {
    return this.service.adminCreateMedLevel(admin.id, input)
  }

  @Mutation(() => MedLevel, { nullable: true })
  adminUpdateMedLevel(
    @CtxUser() admin: User,
    @Args('medLevelId') medLevelId: string,
    @Args('input') input: AdminUpdateMedLevelInput,
  ) {
    return this.service.adminUpdateMedLevel(admin.id, medLevelId, input)
  }

  @Mutation(() => MedLevel, { nullable: true })
  adminDeleteMedLevel(@CtxUser() admin: User, @Args('medLevelId') medLevelId: string) {
    return this.service.adminDeleteMedLevel(admin.id, medLevelId)
  }
}

