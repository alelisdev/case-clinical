import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateUserCourseProgressInput,
  UserListUserCourseProgressInput,
  UserUpdateUserCourseProgressInput,
  ApiUserCourseProgressDataAccessUserService,
  UserCourseProgress,
} from '@case-clinical/api/academy/user-course-progress/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import { CtxUser, GqlAuthGuard } from '@case-clinical/api/auth/util'
import { User } from '@case-clinical/api/user/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiUserCourseProgressFeatureUserResolver {
  constructor(private readonly service: ApiUserCourseProgressDataAccessUserService) {}

  @Query(() => [UserCourseProgress], { nullable: true })
  userUserCourseProgresses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserCourseProgressInput, nullable: true })
    input?: UserListUserCourseProgressInput,
  ) {
    return this.service.userUserCourseProgresses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountUserCourseProgresses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserCourseProgressInput, nullable: true })
    input?: UserListUserCourseProgressInput,
  ) {
    return this.service.userCountUserCourseProgresses(user.id, input)
  }

  @Query(() => UserCourseProgress, { nullable: true })
  userUserCourseProgress(@CtxUser() user: User, @Args('userCourseProgressId') userCourseProgressId: string) {
    return this.service.userUserCourseProgress(user.id, userCourseProgressId)
  }

  @Mutation(() => UserCourseProgress, { nullable: true })
  userCreateUserCourseProgress(@CtxUser() user: User, @Args('input') input: UserCreateUserCourseProgressInput) {
    return this.service.userCreateUserCourseProgress(user.id, input)
  }

  @Mutation(() => UserCourseProgress, { nullable: true })
  userUpdateUserCourseProgress(
    @CtxUser() user: User,
    @Args('userCourseProgressId') userCourseProgressId: string,
    @Args('input') input: UserUpdateUserCourseProgressInput,
  ) {
    return this.service.userUpdateUserCourseProgress(user.id, userCourseProgressId, input)
  }

  @Mutation(() => UserCourseProgress, { nullable: true })
  userDeleteUserCourseProgress(@CtxUser() user: User, @Args('userCourseProgressId') userCourseProgressId: string) {
    return this.service.userDeleteUserCourseProgress(user.id, userCourseProgressId)
  }
}
