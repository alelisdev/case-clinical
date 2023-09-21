import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateAcademyCategoryInput,
  AdminListAcademyCategoryInput,
  AdminUpdateAcademyCategoryInput,
  ApiAcademyCategoryDataAccessAdminService,
  AcademyCategory,
} from '@case-clinical/api/academy/category/data-access'
import { User } from '@case-clinical/api/user/data-access'
import { AdminListCourseInput, Course } from '@case-clinical/api/academy/course/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import { CtxUser, GqlAuthAdminGuard } from '@case-clinical/api/auth/util'

@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiAcademyCategoryFeatureAdminResolver {
  constructor(private readonly service: ApiAcademyCategoryDataAccessAdminService) {}

  @Query(() => [AcademyCategory], { nullable: true })
  adminAcademyCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAcademyCategoryInput, nullable: true })
    input?: AdminListAcademyCategoryInput,
  ) {
    return this.service.adminAcademyCategories(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAcademyCategories(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAcademyCategoryInput, nullable: true })
    input?: AdminListAcademyCategoryInput,
  ) {
    return this.service.adminCountAcademyCategories(admin.id, input)
  }

  @Query(() => [Course], { nullable: true })
  adminAcademyCategoryCourses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCourseInput, nullable: true }) input?: AdminListCourseInput,
  ) {
    return this.service.adminAcademyCategoryCourses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountAcademyCategoryCourses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCourseInput, nullable: true }) input?: AdminListCourseInput,
  ) {
    return this.service.adminCountAcademyCategoryCourses(admin.id, input)
  }

  @Query(() => AcademyCategory, { nullable: true })
  adminAcademyCategory(@CtxUser() admin: User, @Args('academyCategoryId') academyCategoryId: string) {
    return this.service.adminAcademyCategory(admin.id, academyCategoryId)
  }

  @Mutation(() => AcademyCategory, { nullable: true })
  adminCreateAcademyCategory(@CtxUser() admin: User, @Args('input') input: AdminCreateAcademyCategoryInput) {
    return this.service.adminCreateAcademyCategory(admin.id, input)
  }

  @Mutation(() => AcademyCategory, { nullable: true })
  adminUpdateAcademyCategory(
    @CtxUser() admin: User,
    @Args('academyCategoryId') academyCategoryId: string,
    @Args('input') input: AdminUpdateAcademyCategoryInput,
  ) {
    return this.service.adminUpdateAcademyCategory(admin.id, academyCategoryId, input)
  }

  @Mutation(() => AcademyCategory, { nullable: true })
  adminDeleteAcademyCategory(@CtxUser() admin: User, @Args('academyCategoryId') academyCategoryId: string) {
    return this.service.adminDeleteAcademyCategory(admin.id, academyCategoryId)
  }
}
