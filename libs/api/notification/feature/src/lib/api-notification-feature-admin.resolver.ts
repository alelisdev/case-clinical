
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateNotificationInput,
  AdminListNotificationInput,
  AdminUpdateNotificationInput,
  ApiNotificationDataAccessAdminService,
  Notification
} from '@case-clinical/api/notification/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiNotificationFeatureAdminResolver {
  constructor(private readonly service: ApiNotificationDataAccessAdminService) {}

  @Query(() => [Notification], { nullable: true })
  adminNotifications(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNotificationInput, nullable: true }) input?: AdminListNotificationInput,
  ) {
    return this.service.adminNotifications(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountNotifications(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNotificationInput, nullable: true }) input?: AdminListNotificationInput,
  ) {
    return this.service.adminCountNotifications(admin.id, input)
  }





  @Query(() => Notification, { nullable: true })
  adminNotification(@CtxUser() admin: User, @Args('notificationId') notificationId: string) {
    return this.service.adminNotification(admin.id, notificationId)
  }

  @Mutation(() => Notification, { nullable: true })
  adminCreateNotification(@CtxUser() admin: User, @Args('input') input: AdminCreateNotificationInput,) {
    return this.service.adminCreateNotification(admin.id, input)
  }

  @Mutation(() => Notification, { nullable: true })
  adminUpdateNotification(
    @CtxUser() admin: User,
    @Args('notificationId') notificationId: string,
    @Args('input') input: AdminUpdateNotificationInput,
  ) {
    return this.service.adminUpdateNotification(admin.id, notificationId, input)
  }

  @Mutation(() => Notification, { nullable: true })
  adminDeleteNotification(@CtxUser() admin: User, @Args('notificationId') notificationId: string) {
    return this.service.adminDeleteNotification(admin.id, notificationId)
  }
}

