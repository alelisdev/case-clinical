
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateUserInput,
  UserListUserInput,
  UserUpdateUserInput,
  UserUpdateUsersInput,
  ApiUserDataAccessUserService,
  User,
} from '@case-clinical/api/user/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'


import { UserListEmailInput, Email } from '@case-clinical/api/email/data-access'
import { UserListSettingInput, Setting } from '@case-clinical/api/setting/data-access'
import { UserListUserRoleInput, UserRole } from '@case-clinical/api/user-role/data-access'
import { UserListUserCalendarInput, UserCalendar } from '@case-clinical/api/user-calendar/data-access'
import { UserListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { UserListAssignedDocumentInput, AssignedDocument } from '@case-clinical/api/assigned-document/data-access'
import { UserListMessageInput, Message } from '@case-clinical/api/message/data-access'
import { UserListChatInput, Chat } from '@case-clinical/api/chat/data-access'
import { UserListNavigationInput, Navigation } from '@case-clinical/api/navigation/data-access'
import { UserListNotificationInput, Notification } from '@case-clinical/api/notification/data-access'
import { UserListShortcutInput, Shortcut } from '@case-clinical/api/shortcut/data-access'
import { UserListTaskItemInput, TaskItem } from '@case-clinical/api/task-item/data-access'
import { UserUpdateUserFeaturePermissionInput } from '@case-clinical/api/user-feature-permission/data-access'
import { UserUpdateUserFeatureInput } from '@case-clinical/api/user-feature/data-access'
import { TeamUser, UserListTeamUserInput } from '@case-clinical/api/team-user/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiUserFeatureUserResolver {
  constructor(private readonly service: ApiUserDataAccessUserService) {}

  @Query(() => [User], { nullable: true })
  userUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserInput, nullable: true }) input?: UserListUserInput,
  ) {
    return this.service.userUsers(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserInput, nullable: true }) input?: UserListUserInput,
  ) {
    return this.service.userCountUsers(user.id, input)
  }


  @Query(() => [User], { nullable: true })
  userSelectUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserInput, nullable: true }) input?: UserListUserInput,
  ) {
    return this.service.userSelectUsers(user.id, input)
  }



  @Query(() => [Email], { nullable: true })
  userUserEmails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEmailInput, nullable: true }) input?: UserListEmailInput,
  ) {
    return this.service.userUserEmails(user.id, input)
  }



  @Query(() => [Setting], { nullable: true })
  userUserSettings(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSettingInput, nullable: true }) input?: UserListSettingInput,
  ) {
    return this.service.userUserSettings(user.id, input)
  }



  @Query(() => [UserRole], { nullable: true })
  userUserUserRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserRoleInput, nullable: true }) input?: UserListUserRoleInput,
  ) {
    return this.service.userUserUserRoles(user.id, input)
  }



  @Query(() => [UserCalendar], { nullable: true })
  userUserUserCalendars(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserCalendarInput, nullable: true }) input?: UserListUserCalendarInput,
  ) {
    return this.service.userUserUserCalendars(user.id, input)
  }



  @Query(() => [Document], { nullable: true })
  userUserDocuments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDocumentInput, nullable: true }) input?: UserListDocumentInput,
  ) {
    return this.service.userUserDocuments(user.id, input)
  }



  @Query(() => [AssignedDocument], { nullable: true })
  userUserAssignedDocuments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAssignedDocumentInput, nullable: true }) input?: UserListAssignedDocumentInput,
  ) {
    return this.service.userUserAssignedDocuments(user.id, input)
  }



  @Query(() => [Message], { nullable: true })
  userUserMessages(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMessageInput, nullable: true }) input?: UserListMessageInput,
  ) {
    return this.service.userUserMessages(user.id, input)
  }



  @Query(() => [Chat], { nullable: true })
  userUserChats(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListChatInput, nullable: true }) input?: UserListChatInput,
  ) {
    return this.service.userUserChats(user.id, input)
  }



  @Query(() => [Navigation], { nullable: true })
  userUserNavigations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNavigationInput, nullable: true }) input?: UserListNavigationInput,
  ) {
    return this.service.userUserNavigations(user.id, input)
  }



  @Query(() => [Notification], { nullable: true })
  userUserNotifications(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNotificationInput, nullable: true }) input?: UserListNotificationInput,
  ) {
    return this.service.userUserNotifications(user.id, input)
  }



  @Query(() => [Shortcut], { nullable: true })
  userUserShortcuts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListShortcutInput, nullable: true }) input?: UserListShortcutInput,
  ) {
    return this.service.userUserShortcuts(user.id, input)
  }



  @Query(() => [TeamUser], { nullable: true })
  userUserTeamUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamUserInput, nullable: true }) input?: UserListTeamUserInput,
  ) {
    return this.service.userUserTeamUsers(user.id, input)
  }



  @Query(() => [TaskItem], { nullable: true })
  userUserTaskItems(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTaskItemInput, nullable: true }) input?: UserListTaskItemInput,
  ) {
    return this.service.userUserTaskItems(user.id, input)
  }



  @Query(() => CorePaging, { nullable: true })
  userCountUserEmails(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEmailInput, nullable: true }) input?: UserListEmailInput,
  ) {
    return this.service.userCountUserEmails(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserSettings(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListSettingInput, nullable: true }) input?: UserListSettingInput,
  ) {
    return this.service.userCountUserSettings(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserUserRoles(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserRoleInput, nullable: true }) input?: UserListUserRoleInput,
  ) {
    return this.service.userCountUserUserRoles(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserUserCalendars(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListUserCalendarInput, nullable: true }) input?: UserListUserCalendarInput,
  ) {
    return this.service.userCountUserUserCalendars(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserDocuments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDocumentInput, nullable: true }) input?: UserListDocumentInput,
  ) {
    return this.service.userCountUserDocuments(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserAssignedDocuments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAssignedDocumentInput, nullable: true }) input?: UserListAssignedDocumentInput,
  ) {
    return this.service.userCountUserAssignedDocuments(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserMessages(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMessageInput, nullable: true }) input?: UserListMessageInput,
  ) {
    return this.service.userCountUserMessages(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserChats(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListChatInput, nullable: true }) input?: UserListChatInput,
  ) {
    return this.service.userCountUserChats(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserNavigations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNavigationInput, nullable: true }) input?: UserListNavigationInput,
  ) {
    return this.service.userCountUserNavigations(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserNotifications(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListNotificationInput, nullable: true }) input?: UserListNotificationInput,
  ) {
    return this.service.userCountUserNotifications(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserShortcuts(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListShortcutInput, nullable: true }) input?: UserListShortcutInput,
  ) {
    return this.service.userCountUserShortcuts(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserTeamUsers(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTeamUserInput, nullable: true }) input?: UserListTeamUserInput,
  ) {
    return this.service.userCountUserTeamUsers(user.id, input)
  }


  @Query(() => CorePaging, { nullable: true })
  userCountUserTaskItems(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTaskItemInput, nullable: true }) input?: UserListTaskItemInput,
  ) {
    return this.service.userCountUserTaskItems(user.id, input)
  }



  @Query(() => User, { nullable: true })
  userUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.userUser(user.id, userId)
  }

  @Mutation(() => User, { nullable: true })
  userCreateUser(@CtxUser() user: User, @Args('input') input: UserCreateUserInput,) {
    return this.service.userCreateUser(user.id, input)
  }

  @Mutation(() => User, { nullable: true })
  userUpdateUser(
    @CtxUser() user: User,
    @Args('userId') userId: string,
    @Args('input') input: UserUpdateUserInput,
  ) {
    return this.service.userUpdateUser(user.id, userId, input)
  }


  @Mutation(() => Boolean, { nullable: true })
  userUpdateUserStatus(@CtxUser() user: User, @Args('input') input: string) {
    return this.service.userUpdateUserStatus(user.id, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateUsers(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateUsersInput,
  ) {
    return this.service.userUpdateUsers(user.id, input)
  }


  
  @Mutation(() => User, { nullable: true })
  userDeleteUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.userDeleteUser(user.id, userId)
  }
}

