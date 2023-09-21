import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateSettingInput } from '@case-clinical/api/setting/data-access' 
import { UserUpdateUserRoleInput } from '@case-clinical/api/user-role/data-access' 
import { UserUpdateEmailInput } from '@case-clinical/api/email/data-access' 
import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserUpdateAttorneyInput } from '@case-clinical/api/attorney/data-access' 
import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdateMessageInput } from '@case-clinical/api/message/data-access' 
import { UserUpdateNavigationInput } from '@case-clinical/api/navigation/data-access' 
import { UserUpdateNotificationInput } from '@case-clinical/api/notification/data-access' 
import { UserUpdateShortcutInput } from '@case-clinical/api/shortcut/data-access' 
import { UserUpdateUserCourseProgressInput } from '@case-clinical/api/academy/user-course-progress/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserUpdateChatInput } from '@case-clinical/api/chat/data-access' 
import { UserUpdateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { UserUpdateUserFeatureInput } from '@case-clinical/api/user-feature/data-access' 
import { UserUpdateUserFeaturePermissionInput } from '@case-clinical/api/user-feature-permission/data-access' 


@InputType()
export class UserUpdateUserInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

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
  slug?: string

  @Field({ nullable: true }) 
  status?: string

  @Field({ nullable: true }) 
  signupStatus?: number

  @Field({ nullable: true }) 
  verified?: boolean

  @Field({ nullable: true }) 
  customerId?: string

  @Field({ nullable: true }) 
  planId?: string

  @Field({ nullable: true }) 
  dateOfBirth?: Date

  @Field({ nullable: true }) 
  cellPhone?: string

  @Field({ nullable: true }) 
  education?: string

  @Field({ nullable: true }) 
  officeName?: string

  @Field(() => [UserUpdateSettingInput], { nullable: true }) 
  settings?: UserUpdateSettingInput[]

  @Field(() => [UserUpdateUserRoleInput], { nullable: true }) 
  userRoles?: UserUpdateUserRoleInput[]

  @Field(() => [UserUpdateEmailInput], { nullable: true }) 
  emails?: UserUpdateEmailInput[]

  @Field(() => [UserUpdateCaseAccountInput], { nullable: true }) 
  agentAssignedAccounts?: UserUpdateCaseAccountInput[]

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequestsReferredTo?: UserUpdatePriorAuthorizationRequestInput[]

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequestsMedicalProvider?: UserUpdatePriorAuthorizationRequestInput[]

  @Field(() => [UserUpdateAttorneyInput], { nullable: true }) 
  attorneysCreated?: UserUpdateAttorneyInput[]

  @Field(() => [UserUpdateLegalCaseInput], { nullable: true }) 
  agentForTheseLegalCases?: UserUpdateLegalCaseInput[]

  @Field(() => [UserUpdateMessageInput], { nullable: true }) 
  messages?: UserUpdateMessageInput[]

  @Field(() => [UserUpdateNavigationInput], { nullable: true }) 
  navigations?: UserUpdateNavigationInput[]

  @Field(() => [UserUpdateNotificationInput], { nullable: true }) 
  notifications?: UserUpdateNotificationInput[]

  @Field(() => [UserUpdateShortcutInput], { nullable: true }) 
  shortcuts?: UserUpdateShortcutInput[]

  @Field(() => [UserUpdateUserCourseProgressInput], { nullable: true }) 
  courseProgresses?: UserUpdateUserCourseProgressInput[]

  @Field(() => [UserUpdateDocumentInput], { nullable: true }) 
  providerDocuments?: UserUpdateDocumentInput[]

  @Field(() => [UserUpdateChatInput], { nullable: true }) 
  chats?: UserUpdateChatInput[]

  @Field(() => [UserUpdateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserUpdateAssignedDocumentInput[]

  @Field(() => [UserUpdateUserFeatureInput], { nullable: true }) 
  userFeatures?: UserUpdateUserFeatureInput[]

  @Field(() => [UserUpdateUserFeaturePermissionInput], { nullable: true }) 
  userFeaturePermissions?: UserUpdateUserFeaturePermissionInput[]


}