import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateAttorneyInput } from '@case-clinical/api/attorney/data-access' 
import { UserCreateSettingInput } from '@case-clinical/api/setting/data-access' 
import { UserCreateUserRoleInput } from '@case-clinical/api/user-role/data-access' 
import { UserCreateEmailInput } from '@case-clinical/api/email/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserCreateMessageInput } from '@case-clinical/api/message/data-access' 
import { UserCreateNavigationInput } from '@case-clinical/api/navigation/data-access' 
import { UserCreateNotificationInput } from '@case-clinical/api/notification/data-access' 
import { UserCreateShortcutInput } from '@case-clinical/api/shortcut/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserCreateChatInput } from '@case-clinical/api/chat/data-access' 
import { UserCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { UserCreateUserFeatureInput } from '@case-clinical/api/user-feature/data-access' 
import { UserCreateTeamUserInput } from '@case-clinical/api/team-user/data-access' 
import { UserCreateUserFeaturePermissionInput } from '@case-clinical/api/user-feature-permission/data-access' 


@InputType()
export class UserCreateUserInput {

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

  @Field(() => [UserCreateSettingInput], { nullable: true }) 
  settings?: UserCreateSettingInput[]

  @Field(() => [UserCreateUserRoleInput], { nullable: true }) 
  userRoles?: UserCreateUserRoleInput[]

  @Field(() => [UserCreateEmailInput], { nullable: true }) 
  emails?: UserCreateEmailInput[]
  
  

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequestsReferredTo?: UserCreatePriorAuthorizationRequestInput[]

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequestsMedicalProvider?: UserCreatePriorAuthorizationRequestInput[]

  @Field(() => [UserCreateMessageInput], { nullable: true }) 
  messages?: UserCreateMessageInput[]

  @Field(() => [UserCreateNavigationInput], { nullable: true }) 
  navigations?: UserCreateNavigationInput[]

  @Field(() => [UserCreateNotificationInput], { nullable: true }) 
  notifications?: UserCreateNotificationInput[]

  @Field(() => [UserCreateShortcutInput], { nullable: true }) 
  shortcuts?: UserCreateShortcutInput[]

  @Field(() => [UserCreateDocumentInput], { nullable: true }) 
  providerDocuments?: UserCreateDocumentInput[]

  @Field(() => [UserCreateChatInput], { nullable: true }) 
  chats?: UserCreateChatInput[]

  @Field(() => [UserCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserCreateAssignedDocumentInput[]

  @Field(() => [UserCreateUserFeatureInput], { nullable: true }) 
  userFeatures?: UserCreateUserFeatureInput[]

  @Field(() => [UserCreateTeamUserInput], { nullable: true }) 
  teamUsers?: UserCreateTeamUserInput[]

  @Field(() => [UserCreateUserFeaturePermissionInput], { nullable: true }) 
  userFeaturePermissions?: UserCreateUserFeaturePermissionInput[]

  @Field({ nullable: true }) 
  attorneyId?: string

  @Field({ nullable: true }) 
  providerId?: string

  @Field({ nullable: true }) 
  patientId?: string
  

  @Field(() => UserCreatePatientInput ,{ nullable: true }) 
  patient?: UserCreatePatientInput  


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  provider?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateAttorneyInput ,{ nullable: true }) 
  attorney?: UserCreateAttorneyInput  

}
