import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateEmailInput } from '@case-clinical/api/email/data-access' 
import { AdminUpdateSettingInput } from '@case-clinical/api/setting/data-access' 
import { AdminUpdateUserRoleInput } from '@case-clinical/api/user-role/data-access' 
import { AdminUpdateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 
import { AdminUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminUpdateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { AdminUpdateMessageInput } from '@case-clinical/api/message/data-access' 
import { AdminUpdateChatInput } from '@case-clinical/api/chat/data-access' 
import { AdminUpdateNavigationInput } from '@case-clinical/api/navigation/data-access' 
import { AdminUpdateNotificationInput } from '@case-clinical/api/notification/data-access' 
import { AdminUpdateShortcutInput } from '@case-clinical/api/shortcut/data-access' 
import { AdminUpdateTeamUserInput } from '@case-clinical/api/team-user/data-access' 
import { AdminUpdateTaskItemInput } from '@case-clinical/api/task-item/data-access' 


@InputType()
export class AdminUpdateUserInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  developer?: boolean

  @Field({ nullable: true }) 
  username?: string

  @Field({ nullable: true }) 
  password?: string

  @Field({ nullable: true }) 
  firstName?: string

  @Field({ nullable: true }) 
  lastName?: string

  @Field({ nullable: true }) 
  avatarUrl?: string

  @Field({ nullable: true }) 
  line1?: string

  @Field({ nullable: true }) 
  line2?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  postalCode?: string

  @Field({ nullable: true }) 
  phone?: string

  @Field({ nullable: true }) 
  bio?: string

  @Field({ nullable: true }) 
  status?: string

  @Field({ nullable: true }) 
  dateOfBirth?: Date

  @Field({ nullable: true }) 
  cellPhone?: string

  @Field({ nullable: true }) 
  education?: string

  @Field(() => [AdminUpdateEmailInput], { nullable: true }) 
  emails?: AdminUpdateEmailInput[]

  @Field(() => [AdminUpdateSettingInput], { nullable: true }) 
  settings?: AdminUpdateSettingInput[]

  @Field(() => [AdminUpdateUserRoleInput], { nullable: true }) 
  userRoles?: AdminUpdateUserRoleInput[]

  @Field(() => [AdminUpdateUserCalendarInput], { nullable: true }) 
  userCalendars?: AdminUpdateUserCalendarInput[]

  @Field(() => [AdminUpdateDocumentInput], { nullable: true }) 
  documents?: AdminUpdateDocumentInput[]

  @Field(() => [AdminUpdateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: AdminUpdateAssignedDocumentInput[]

  @Field(() => [AdminUpdateMessageInput], { nullable: true }) 
  messages?: AdminUpdateMessageInput[]

  @Field(() => [AdminUpdateChatInput], { nullable: true }) 
  chats?: AdminUpdateChatInput[]

  @Field(() => [AdminUpdateNavigationInput], { nullable: true }) 
  navigations?: AdminUpdateNavigationInput[]

  @Field(() => [AdminUpdateNotificationInput], { nullable: true }) 
  notifications?: AdminUpdateNotificationInput[]

  @Field(() => [AdminUpdateShortcutInput], { nullable: true }) 
  shortcuts?: AdminUpdateShortcutInput[]

  @Field(() => [AdminUpdateTeamUserInput], { nullable: true }) 
  teamUsers?: AdminUpdateTeamUserInput[]

  @Field(() => [AdminUpdateUserCalendarInput], { nullable: true }) 
  calendars?: AdminUpdateUserCalendarInput[]

  @Field(() => [AdminUpdateTaskItemInput], { nullable: true }) 
  tasks?: AdminUpdateTaskItemInput[]
}