import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateEmailInput } from '@case-clinical/api/email/data-access' 
import { AdminCreateSettingInput } from '@case-clinical/api/setting/data-access' 
import { AdminCreateUserRoleInput } from '@case-clinical/api/user-role/data-access' 
import { AdminCreateUserCalendarInput } from '@case-clinical/api/user-calendar/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { AdminCreateMessageInput } from '@case-clinical/api/message/data-access' 
import { AdminCreateChatInput } from '@case-clinical/api/chat/data-access' 
import { AdminCreateNavigationInput } from '@case-clinical/api/navigation/data-access' 
import { AdminCreateNotificationInput } from '@case-clinical/api/notification/data-access' 
import { AdminCreateShortcutInput } from '@case-clinical/api/shortcut/data-access' 
import { AdminCreateTeamUserInput } from '@case-clinical/api/team-user/data-access' 
import { AdminCreateTaskItemInput } from '@case-clinical/api/task-item/data-access' 


@InputType()
export class AdminCreateUserInput {

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

  @Field(() => [AdminCreateEmailInput], { nullable: true }) 
  emails?: AdminCreateEmailInput[]

  @Field(() => [AdminCreateSettingInput], { nullable: true }) 
  settings?: AdminCreateSettingInput[]

  @Field(() => [AdminCreateUserRoleInput], { nullable: true }) 
  userRoles?: AdminCreateUserRoleInput[]

  @Field(() => [AdminCreateUserCalendarInput], { nullable: true }) 
  userCalendars?: AdminCreateUserCalendarInput[]

  @Field(() => [AdminCreateDocumentInput], { nullable: true }) 
  documents?: AdminCreateDocumentInput[]

  @Field(() => [AdminCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: AdminCreateAssignedDocumentInput[]

  @Field(() => [AdminCreateMessageInput], { nullable: true }) 
  messages?: AdminCreateMessageInput[]

  @Field(() => [AdminCreateChatInput], { nullable: true }) 
  chats?: AdminCreateChatInput[]

  @Field(() => [AdminCreateNavigationInput], { nullable: true }) 
  navigations?: AdminCreateNavigationInput[]

  @Field(() => [AdminCreateNotificationInput], { nullable: true }) 
  notifications?: AdminCreateNotificationInput[]

  @Field(() => [AdminCreateShortcutInput], { nullable: true }) 
  shortcuts?: AdminCreateShortcutInput[]

  @Field(() => [AdminCreateTeamUserInput], { nullable: true }) 
  teamUsers?: AdminCreateTeamUserInput[]

  @Field(() => [AdminCreateUserCalendarInput], { nullable: true }) 
  calendars?: AdminCreateUserCalendarInput[]

  @Field(() => [AdminCreateTaskItemInput], { nullable: true }) 
  tasks?: AdminCreateTaskItemInput[]

}