import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAccidentTypeInput } from '@case-clinical/api/accident-type/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserCreateLeadStatusInput } from '@case-clinical/api/lead-status/data-access' 
import { UserCreateLeadSourceInput } from '@case-clinical/api/lead-source/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 
import { UserCreateBodyPartLeadInput } from '@case-clinical/api/body-part-lead/data-access' 
import { UserCreateLeadActionInput } from '@case-clinical/api/lead-action/data-access' 
import { UserCreateInsuranceInput } from '@case-clinical/api/insurance/data-access' 
import { UserCreateLeadInjuryInput } from '@case-clinical/api/lead-injury/data-access' 
import { UserCreateLeadTreatmentInput } from '@case-clinical/api/lead-treatment/data-access' 


@InputType()
export class UserCreateLeadInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  firstName?: string

  @Field({ nullable: true }) 
  middleName?: string

  @Field({ nullable: true }) 
  lastName?: string

  @Field({ nullable: true }) 
  address?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  postalCode?: string

  @Field({ nullable: true }) 
  dateOfBirth?: Date

  @Field({ nullable: true }) 
  dateOfLoss?: Date

  @Field({ nullable: true }) 
  dateOfRetention?: Date

  @Field({ nullable: true }) 
  phoneNumber?: string

  @Field({ nullable: true }) 
  emailAddress?: string

  @Field({ nullable: true }) 
  priorRepresentation?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  driversLicenseId?: string

  @Field({ nullable: true }) 
  driversLicenseNumber?: string

  @Field({ nullable: true }) 
  driversLicenseState?: string

  @Field({ nullable: true }) 
  severeInjury?: boolean

  @Field(() => [UserCreateBodyPartLeadInput], { nullable: true }) 
  bodyPartsInjured?: UserCreateBodyPartLeadInput[]

  @Field({ nullable: true }) 
  emergencyContactId?: string

  @Field({ nullable: true }) 
  allowedToContactEmergencyContact?: boolean

  @Field({ nullable: true }) 
  policeReport?: boolean

  @Field({ nullable: true }) 
  policeReportAttachmentId?: string

  @Field({ nullable: true }) 
  phoneRecordingId?: string

  @Field({ nullable: true }) 
  leadStatusId?: string

  @Field({ nullable: true }) 
  leadSpecialistId?: string

  @Field(() => [UserCreateLeadActionInput], { nullable: true }) 
  leadActions?: UserCreateLeadActionInput[]

  @Field({ nullable: true }) 
  leadSourceId?: string

  @Field({ nullable: true }) 
  submittedById?: string

  @Field(() => [UserCreateInsuranceInput], { nullable: true }) 
  insurances?: UserCreateInsuranceInput[]

  @Field(() => [UserCreateLeadInjuryInput], { nullable: true }) 
  injuries?: UserCreateLeadInjuryInput[]

  @Field(() => [UserCreateLeadTreatmentInput], { nullable: true }) 
  treatments?: UserCreateLeadTreatmentInput[]

  @Field({ nullable: true }) 
  legalCaseId?: string


  @Field(() => UserCreateAccidentTypeInput ,{ nullable: true }) 
  accidentType?: UserCreateAccidentTypeInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  driversLicense?: UserCreateDocumentInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  policeReportAttachment?: UserCreateDocumentInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  phoneRecording?: UserCreateDocumentInput  


  @Field(() => UserCreateLeadStatusInput ,{ nullable: true }) 
  status?: UserCreateLeadStatusInput  


  @Field(() => UserCreateLeadSourceInput ,{ nullable: true }) 
  sourceOfLead?: UserCreateLeadSourceInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  submittedBy?: UserCreateUserInput  

}
