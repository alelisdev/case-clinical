import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCourseInput,
  UserListCourseInput,
  UserUpdateCourseInput,
  ApiCourseDataAccessUserService,
  Course,
} from '@case-clinical/api/academy/course/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import { CtxUser, GqlAuthGuard } from '@case-clinical/api/auth/util'
import { User } from '@case-clinical/api/user/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCourseFeatureUserResolver {
  constructor(private readonly service: ApiCourseDataAccessUserService) {}

  @Query(() => [Course], { nullable: true })
  userCourses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCourseInput, nullable: true }) input?: UserListCourseInput,
  ) {
    return this.service.userCourses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCourses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCourseInput, nullable: true }) input?: UserListCourseInput,
  ) {
    return this.service.userCountCourses(user.id, input)
  }

  @Query(() => Course, { nullable: true })
  userCourse(@CtxUser() user: User, @Args('courseId') courseId: string) {
    return this.service.userCourse(user.id, courseId)
  }

  @Mutation(() => Course, { nullable: true })
  userCreateCourse(@CtxUser() user: User, @Args('input') input: UserCreateCourseInput) {
    return this.service.userCreateCourse(user.id, input)
  }

  @Mutation(() => Course, { nullable: true })
  userUpdateCourse(
    @CtxUser() user: User,
    @Args('courseId') courseId: string,
    @Args('input') input: UserUpdateCourseInput,
  ) {
    return this.service.userUpdateCourse(user.id, courseId, input)
  }

  @Mutation(() => Course, { nullable: true })
  userDeleteCourse(@CtxUser() user: User, @Args('courseId') courseId: string) {
    return this.service.userDeleteCourse(user.id, courseId)
  }
}
