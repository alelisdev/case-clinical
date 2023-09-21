import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  ApiNovuNotificationDataAccessService, NovuNotification, UserListNovuNotificationInput,
} from '@case-clinical/api/novu-notification/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'
import { User } from '@case-clinical/api/user/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiNovuNotificationFeatureResolver {
  constructor(private readonly service: ApiNovuNotificationDataAccessService) {}

  @Query(() => [NovuNotification], { nullable: true })
  userNovuNotifications(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNovuNotificationInput, nullable: true }) input?: UserListNovuNotificationInput,
  ) {
    return this.service.userNovuNotifications(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountNovuNotifications(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNovuNotificationInput, nullable: true }) input?: UserListNovuNotificationInput,
  ) {
    return this.service.userCountNovuNotifications(user.id, input)
  }
  @Mutation(() => Number, { nullable: true })
  subscribeNovuNotification(
    @CtxUser() user: User,
    @Args({ name: 'notificationId', type: () => String, nullable: true }) notificationId?: string,
  ) {
    return this.service.subscribeNovNotification(user.id, notificationId)
  }

  @Mutation(() => Number, { nullable: true })
  unsubscribeNovuNotification(
    @CtxUser() user: User,
    @Args({ name: 'notificationId', type: () => String, nullable: true }) notificationId?: string,
  ) {
    return this.service.unsubscribeNovNotification(user.id, notificationId)
  }

  @Mutation(() => Number, { nullable: true })
  updateReadStatus(
    @CtxUser() user: User,
    @Args({ name: 'notificationId', type: () => String, nullable: true }) notificationId?: string,
  ) {
    return this.service.updateReadStatus(notificationId)
  }
}
