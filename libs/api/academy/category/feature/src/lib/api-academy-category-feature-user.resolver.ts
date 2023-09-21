import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAcademyCategoryInput,
  UserListAcademyCategoryInput,
  UserUpdateAcademyCategoryInput,
  ApiAcademyCategoryDataAccessUserService,
  AcademyCategory,
  UserUpdateAcademyCategoriesInput,
} from '@case-clinical/api/academy/category/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import { CtxUser, GqlAuthGuard } from '@case-clinical/api/auth/util'
import { User } from '@case-clinical/api/user/data-access'
import { UserListCourseInput, Course } from '@case-clinical/api/academy/course/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAcademyCategoryFeatureUserResolver {
  constructor(private readonly service: ApiAcademyCategoryDataAccessUserService) {}

  @Query(() => [AcademyCategory], { nullable: true })
  userAcademyCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAcademyCategoryInput, nullable: true })
    input?: UserListAcademyCategoryInput,
  ) {
    return this.service.userAcademyCategories(user.id, input)
  }

  @Query(() => [AcademyCategory], { nullable: true })
  userSelectAcademyCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAcademyCategoryInput, nullable: true }) input?: UserListAcademyCategoryInput,
  ) {
    return this.service.userSelectAcademyCategories(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAcademyCategories(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAcademyCategoryInput, nullable: true })
    input?: UserListAcademyCategoryInput,
  ) {
    return this.service.userCountAcademyCategories(user.id, input)
  }

  @Query(() => [Course], { nullable: true })
  userAcademyCategoryCourses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCourseInput, nullable: true }) input?: UserListCourseInput,
  ) {
    return this.service.userAcademyCategoryCourses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAcademyCategoryCourses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCourseInput, nullable: true }) input?: UserListCourseInput,
  ) {
    return this.service.userCountAcademyCategoryCourses(user.id, input)
  }

  @Query(() => AcademyCategory, { nullable: true })
  userAcademyCategory(@CtxUser() user: User, @Args('academyCategoryId') academyCategoryId: string) {
    return this.service.userAcademyCategory(user.id, academyCategoryId)
  }

  @Mutation(() => AcademyCategory, { nullable: true })
  userCreateAcademyCategory(@CtxUser() user: User, @Args('input') input: UserCreateAcademyCategoryInput) {
    return this.service.userCreateAcademyCategory(user.id, input)
  }

  @Mutation(() => AcademyCategory, { nullable: true })
  userUpdateAcademyCategory(
    @CtxUser() user: User,
    @Args('academyCategoryId') academyCategoryId: string,
    @Args('input') input: UserUpdateAcademyCategoryInput,
  ) {
    return this.service.userUpdateAcademyCategory(user.id, academyCategoryId, input)
  }

  @Mutation(() => AcademyCategory, { nullable: true })
  userDeleteAcademyCategory(@CtxUser() user: User, @Args('academyCategoryId') academyCategoryId: string) {
    return this.service.userDeleteAcademyCategory(user.id, academyCategoryId)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAcademyCategories(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAcademyCategoriesInput,
  ) {
    return this.service.userUpdateAcademyCategories(user.id, input)
  }
}
