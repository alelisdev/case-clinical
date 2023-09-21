
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateNotificationInput,
  UserListNotificationInput,
  UserUpdateNotificationInput,
  ApiNotificationDataAccessUserService,
  Notification,
} from '@case-clinical/api/notification/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiNotificationFeatureUserResolver {
  constructor(private readonly service: ApiNotificationDataAccessUserService) {}

  @Query(() => [Notification], { nullable: true })
  userNotifications(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNotificationInput, nullable: true }) input?: UserListNotificationInput,
  ) {
    return this.service.userNotifications(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountNotifications(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNotificationInput, nullable: true }) input?: UserListNotificationInput,
  ) {
    return this.service.userCountNotifications(user.id, input)
  }






  @Query(() => Notification, { nullable: true })
  userNotification(@CtxUser() user: User, @Args('notificationId') notificationId: string) {
    return this.service.userNotification(user.id, notificationId)
  }

  @Mutation(() => Notification, { nullable: true })
  userCreateNotification(@CtxUser() user: User, @Args('input') input: UserCreateNotificationInput,) {
    return this.service.userCreateNotification(user.id, input)
  }

  @Mutation(() => Notification, { nullable: true })
  userUpdateNotification(
    @CtxUser() user: User,
    @Args('notificationId') notificationId: string,
    @Args('input') input: UserUpdateNotificationInput,
  ) {
    return this.service.userUpdateNotification(user.id, notificationId, input)
  }

  @Mutation(() => Notification, { nullable: true })
  userDeleteNotification(@CtxUser() user: User, @Args('notificationId') notificationId: string) {
    return this.service.userDeleteNotification(user.id, notificationId)
  }
}

