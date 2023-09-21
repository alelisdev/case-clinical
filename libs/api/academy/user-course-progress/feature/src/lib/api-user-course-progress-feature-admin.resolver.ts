import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateUserCourseProgressInput,
  AdminListUserCourseProgressInput,
  AdminUpdateUserCourseProgressInput,
  ApiUserCourseProgressDataAccessAdminService,
  UserCourseProgress
} from '@case-clinical/api/academy/user-course-progress/data-access'
import { User } from '@case-clinical/api/user/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'

@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiUserCourseProgressFeatureAdminResolver {
  constructor(private readonly service: ApiUserCourseProgressDataAccessAdminService) {}

  @Query(() => [UserCourseProgress], { nullable: true })
  adminUserCourseProgresses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserCourseProgressInput, nullable: true }) input?: AdminListUserCourseProgressInput,
  ) {
    return this.service.adminUserCourseProgresses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountUserCourseProgresses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserCourseProgressInput, nullable: true }) input?: AdminListUserCourseProgressInput,
  ) {
    return this.service.adminCountUserCourseProgresses(admin.id, input)
  }

  @Query(() => UserCourseProgress, { nullable: true })
  adminUserCourseProgress(@CtxUser() admin: User, @Args('userCourseProgressId') userCourseProgressId: string) {
    return this.service.adminUserCourseProgress(admin.id, userCourseProgressId)
  }

  @Mutation(() => UserCourseProgress, { nullable: true })
  adminCreateUserCourseProgress(@CtxUser() admin: User, @Args('input') input: AdminCreateUserCourseProgressInput,) {
    return this.service.adminCreateUserCourseProgress(admin.id, input)
  }

  @Mutation(() => UserCourseProgress, { nullable: true })
  adminUpdateUserCourseProgress(
    @CtxUser() admin: User,
    @Args('userCourseProgressId') userCourseProgressId: string,
    @Args('input') input: AdminUpdateUserCourseProgressInput,
  ) {
    return this.service.adminUpdateUserCourseProgress(admin.id, userCourseProgressId, input)
  }

  @Mutation(() => UserCourseProgress, { nullable: true })
  adminDeleteUserCourseProgress(@CtxUser() admin: User, @Args('userCourseProgressId') userCourseProgressId: string) {
    return this.service.adminDeleteUserCourseProgress(admin.id, userCourseProgressId)
  }
}

