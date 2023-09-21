
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCourseInput,
  AdminListCourseInput,
  AdminUpdateCourseInput,
  ApiCourseDataAccessAdminService,
  Course
} from '@case-clinical/api/academy/course/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCourseFeatureAdminResolver {
  constructor(private readonly service: ApiCourseDataAccessAdminService) {}

  @Query(() => [Course], { nullable: true })
  adminCourses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCourseInput, nullable: true }) input?: AdminListCourseInput,
  ) {
    return this.service.adminCourses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCourses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCourseInput, nullable: true }) input?: AdminListCourseInput,
  ) {
    return this.service.adminCountCourses(admin.id, input)
  }





  @Query(() => Course, { nullable: true })
  adminCourse(@CtxUser() admin: User, @Args('courseId') courseId: string) {
    return this.service.adminCourse(admin.id, courseId)
  }

  @Mutation(() => Course, { nullable: true })
  adminCreateCourse(@CtxUser() admin: User, @Args('input') input: AdminCreateCourseInput,) {
    return this.service.adminCreateCourse(admin.id, input)
  }

  @Mutation(() => Course, { nullable: true })
  adminUpdateCourse(
    @CtxUser() admin: User,
    @Args('courseId') courseId: string,
    @Args('input') input: AdminUpdateCourseInput,
  ) {
    return this.service.adminUpdateCourse(admin.id, courseId, input)
  }

  @Mutation(() => Course, { nullable: true })
  adminDeleteCourse(@CtxUser() admin: User, @Args('courseId') courseId: string) {
    return this.service.adminDeleteCourse(admin.id, courseId)
  }
}

