import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminCreateAttorneyInput } from '@case-clinical/api/attorney/data-access' 
import { AdminCreateSettingInput } from '@case-clinical/api/setting/data-access' 
import { AdminCreateUserRoleInput } from '@case-clinical/api/user-role/data-access' 
import { AdminCreateEmailInput } from '@case-clinical/api/email/data-access' 
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { AdminCreateMessageInput } from '@case-clinical/api/message/data-access' 
import { AdminCreateNavigationInput } from '@case-clinical/api/navigation/data-access' 
import { AdminCreateNotificationInput } from '@case-clinical/api/notification/data-access' 
import { AdminCreateShortcutInput } from '@case-clinical/api/shortcut/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreateChatInput } from '@case-clinical/api/chat/data-access' 
import { AdminCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { AdminCreateUserFeatureInput } from '@case-clinical/api/user-feature/data-access' 
import { AdminCreateTeamUserInput } from '@case-clinical/api/team-user/data-access' 
import { AdminCreateUserFeaturePermissionInput } from '@case-clinical/api/user-feature-permission/data-access' 


@InputType()
export class AdminCreateUserInput {

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

  @Field(() => [AdminCreateSettingInput], { nullable: true }) 
  settings?: AdminCreateSettingInput[]

  @Field(() => [AdminCreateUserRoleInput], { nullable: true }) 
  userRoles?: AdminCreateUserRoleInput[]

  @Field(() => [AdminCreateEmailInput], { nullable: true }) 
  emails?: AdminCreateEmailInput[]

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequestsReferredTo?: AdminCreatePriorAuthorizationRequestInput[]

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequestsMedicalProvider?: AdminCreatePriorAuthorizationRequestInput[]

  @Field(() => [AdminCreateMessageInput], { nullable: true }) 
  messages?: AdminCreateMessageInput[]

  @Field(() => [AdminCreateNavigationInput], { nullable: true }) 
  navigations?: AdminCreateNavigationInput[]

  @Field(() => [AdminCreateNotificationInput], { nullable: true }) 
  notifications?: AdminCreateNotificationInput[]

  @Field(() => [AdminCreateShortcutInput], { nullable: true }) 
  shortcuts?: AdminCreateShortcutInput[]

  @Field(() => [AdminCreateDocumentInput], { nullable: true }) 
  providerDocuments?: AdminCreateDocumentInput[]

  @Field(() => [AdminCreateChatInput], { nullable: true }) 
  chats?: AdminCreateChatInput[]

  @Field(() => [AdminCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: AdminCreateAssignedDocumentInput[]

  @Field(() => [AdminCreateUserFeatureInput], { nullable: true }) 
  userFeatures?: AdminCreateUserFeatureInput[]

  @Field(() => [AdminCreateTeamUserInput], { nullable: true }) 
  teamUsers?: AdminCreateTeamUserInput[]

  @Field(() => [AdminCreateUserFeaturePermissionInput], { nullable: true }) 
  userFeaturePermissions?: AdminCreateUserFeaturePermissionInput[]

  @Field({ nullable: true }) 
  attorneyId?: string

  @Field({ nullable: true }) 
  providerId?: string

  @Field({ nullable: true }) 
  patientId?: string


  @Field(() => AdminCreatePatientInput ,{ nullable: true }) 
  patient?: AdminCreatePatientInput  


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  provider?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateAttorneyInput ,{ nullable: true }) 
  attorney?: AdminCreateAttorneyInput  

}