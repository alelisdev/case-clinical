
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateNavigationInput,
  UserListNavigationInput,
  UserUpdateNavigationInput,
  ApiNavigationDataAccessUserService,
  Navigation,
} from '@case-clinical/api/navigation/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiNavigationFeatureUserResolver {
  constructor(private readonly service: ApiNavigationDataAccessUserService) {}

  @Query(() => [Navigation], { nullable: true })
  userNavigations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNavigationInput, nullable: true }) input?: UserListNavigationInput,
  ) {
    return this.service.userNavigations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountNavigations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNavigationInput, nullable: true }) input?: UserListNavigationInput,
  ) {
    return this.service.userCountNavigations(user.id, input)
  }



  @Query(() => [Navigation], { nullable: true })
  userNavigationNavigations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNavigationInput, nullable: true }) input?: UserListNavigationInput,
  ) {
    return this.service.userNavigationNavigations(user.id, input)
  }





  @Query(() => Navigation, { nullable: true })
  userNavigation(@CtxUser() user: User, @Args('navigationId') navigationId: string) {
    return this.service.userNavigation(user.id, navigationId)
  }

  @Mutation(() => Navigation, { nullable: true })
  userCreateNavigation(@CtxUser() user: User, @Args('input') input: UserCreateNavigationInput,) {
    return this.service.userCreateNavigation(user.id, input)
  }

  @Mutation(() => Navigation, { nullable: true })
  userUpdateNavigation(
    @CtxUser() user: User,
    @Args('navigationId') navigationId: string,
    @Args('input') input: UserUpdateNavigationInput,
  ) {
    return this.service.userUpdateNavigation(user.id, navigationId, input)
  }

  @Mutation(() => Navigation, { nullable: true })
  userDeleteNavigation(@CtxUser() user: User, @Args('navigationId') navigationId: string) {
    return this.service.userDeleteNavigation(user.id, navigationId)
  }
}

