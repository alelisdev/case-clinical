
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateUserInput,
  AdminListUserInput,
  AdminUpdateUserInput,
  ApiUserDataAccessAdminService,
  User
} from '@case-clinical/api/user/data-access'


import { AdminListEmailInput, Email } from '@case-clinical/api/email/data-access'
import { AdminListSettingInput, Setting } from '@case-clinical/api/setting/data-access'
import { AdminListUserRoleInput, UserRole } from '@case-clinical/api/user-role/data-access'
import { AdminListUserCalendarInput, UserCalendar } from '@case-clinical/api/user-calendar/data-access'
import { AdminListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { AdminListAssignedDocumentInput, AssignedDocument } from '@case-clinical/api/assigned-document/data-access'
import { AdminListMessageInput, Message } from '@case-clinical/api/message/data-access'
import { AdminListChatInput, Chat } from '@case-clinical/api/chat/data-access'
import { AdminListNavigationInput, Navigation } from '@case-clinical/api/navigation/data-access'
import { AdminListNotificationInput, Notification } from '@case-clinical/api/notification/data-access'
import { AdminListShortcutInput, Shortcut } from '@case-clinical/api/shortcut/data-access'
import { AdminListTeamUserInput, TeamUser } from '@case-clinical/api/team-user/data-access'
import { AdminListTaskItemInput, TaskItem } from '@case-clinical/api/task-item/data-access'

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


  @Query(() => [Email], { nullable: true })
  adminUserEmails(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEmailInput, nullable: true }) input?: AdminListEmailInput,
  ) {
    return this.service.adminUserEmails(admin.id, input)
  }



  @Query(() => [Setting], { nullable: true })
  adminUserSettings(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSettingInput, nullable: true }) input?: AdminListSettingInput,
  ) {
    return this.service.adminUserSettings(admin.id, input)
  }



  @Query(() => [UserRole], { nullable: true })
  adminUserUserRoles(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserRoleInput, nullable: true }) input?: AdminListUserRoleInput,
  ) {
    return this.service.adminUserUserRoles(admin.id, input)
  }



  @Query(() => [UserCalendar], { nullable: true })
  adminUserUserCalendars(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserCalendarInput, nullable: true }) input?: AdminListUserCalendarInput,
  ) {
    return this.service.adminUserUserCalendars(admin.id, input)
  }



  @Query(() => [Document], { nullable: true })
  adminUserDocuments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDocumentInput, nullable: true }) input?: AdminListDocumentInput,
  ) {
    return this.service.adminUserDocuments(admin.id, input)
  }



  @Query(() => [AssignedDocument], { nullable: true })
  adminUserAssignedDocuments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAssignedDocumentInput, nullable: true }) input?: AdminListAssignedDocumentInput,
  ) {
    return this.service.adminUserAssignedDocuments(admin.id, input)
  }



  @Query(() => [Message], { nullable: true })
  adminUserMessages(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMessageInput, nullable: true }) input?: AdminListMessageInput,
  ) {
    return this.service.adminUserMessages(admin.id, input)
  }



  @Query(() => [Chat], { nullable: true })
  adminUserChats(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListChatInput, nullable: true }) input?: AdminListChatInput,
  ) {
    return this.service.adminUserChats(admin.id, input)
  }



  @Query(() => [Navigation], { nullable: true })
  adminUserNavigations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNavigationInput, nullable: true }) input?: AdminListNavigationInput,
  ) {
    return this.service.adminUserNavigations(admin.id, input)
  }



  @Query(() => [Notification], { nullable: true })
  adminUserNotifications(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNotificationInput, nullable: true }) input?: AdminListNotificationInput,
  ) {
    return this.service.adminUserNotifications(admin.id, input)
  }



  @Query(() => [Shortcut], { nullable: true })
  adminUserShortcuts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListShortcutInput, nullable: true }) input?: AdminListShortcutInput,
  ) {
    return this.service.adminUserShortcuts(admin.id, input)
  }



  @Query(() => [TeamUser], { nullable: true })
  adminUserTeamUsers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTeamUserInput, nullable: true }) input?: AdminListTeamUserInput,
  ) {
    return this.service.adminUserTeamUsers(admin.id, input)
  }



  @Query(() => [TaskItem], { nullable: true })
  adminUserTaskItems(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTaskItemInput, nullable: true }) input?: AdminListTaskItemInput,
  ) {
    return this.service.adminUserTaskItems(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountUserEmails(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEmailInput, nullable: true }) input?: AdminListEmailInput,
  ) {
    return this.service.adminCountUserEmails(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserSettings(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListSettingInput, nullable: true }) input?: AdminListSettingInput,
  ) {
    return this.service.adminCountUserSettings(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserUserRoles(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserRoleInput, nullable: true }) input?: AdminListUserRoleInput,
  ) {
    return this.service.adminCountUserUserRoles(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserUserCalendars(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListUserCalendarInput, nullable: true }) input?: AdminListUserCalendarInput,
  ) {
    return this.service.adminCountUserUserCalendars(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserDocuments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDocumentInput, nullable: true }) input?: AdminListDocumentInput,
  ) {
    return this.service.adminCountUserDocuments(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserAssignedDocuments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListAssignedDocumentInput, nullable: true }) input?: AdminListAssignedDocumentInput,
  ) {
    return this.service.adminCountUserAssignedDocuments(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserMessages(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMessageInput, nullable: true }) input?: AdminListMessageInput,
  ) {
    return this.service.adminCountUserMessages(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserChats(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListChatInput, nullable: true }) input?: AdminListChatInput,
  ) {
    return this.service.adminCountUserChats(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserNavigations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNavigationInput, nullable: true }) input?: AdminListNavigationInput,
  ) {
    return this.service.adminCountUserNavigations(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserNotifications(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListNotificationInput, nullable: true }) input?: AdminListNotificationInput,
  ) {
    return this.service.adminCountUserNotifications(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserShortcuts(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListShortcutInput, nullable: true }) input?: AdminListShortcutInput,
  ) {
    return this.service.adminCountUserShortcuts(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserTeamUsers(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTeamUserInput, nullable: true }) input?: AdminListTeamUserInput,
  ) {
    return this.service.adminCountUserTeamUsers(admin.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  adminCountUserTaskItems(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTaskItemInput, nullable: true }) input?: AdminListTaskItemInput,
  ) {
    return this.service.adminCountUserTaskItems(admin.id, input)
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

