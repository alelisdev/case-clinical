
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateUserInput,
  AdminListUserInput,
  AdminUpdateUserInput,
  ApiUserDataAccessAdminService,
  User
} from '@case-clinical/api/user/data-access'




import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiUserFeatureAdminResolver {
  constructor(private readonly service: ApiUserDataAccessAdminService) {}

  @Query(() => [User], { nullable: true })
  adminUsers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserInput, nullable: true }) input?: AdminListUserInput,
  ) {
    return this.service.adminUsers(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountUsers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserInput, nullable: true }) input?: AdminListUserInput,
  ) {
    return this.service.adminCountUsers(admin.id, input)
  }





  @Query(() => User, { nullable: true })
  adminUser(@CtxUser() admin: User, @Args('userId') userId: string) {
    return this.service.adminUser(admin.id, userId)
  }

  @Mutation(() => User, { nullable: true })
  adminCreateUser(@CtxUser() admin: User, @Args('input') input: AdminCreateUserInput,) {
    return this.service.adminCreateUser(admin.id, input)
  }

  @Mutation(() => User, { nullable: true })
  adminUpdateUser(
    @CtxUser() admin: User,
    @Args('userId') userId: string,
    @Args('input') input: AdminUpdateUserInput,
  ) {
    return this.service.adminUpdateUser(admin.id, userId, input)
  }

  @Mutation(() => User, { nullable: true })
  adminDeleteUser(@CtxUser() admin: User, @Args('userId') userId: string) {
    return this.service.adminDeleteUser(admin.id, userId)
  }
}

