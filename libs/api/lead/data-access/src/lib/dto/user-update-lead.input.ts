import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAccidentTypeInput } from '@case-clinical/api/accident-type/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserUpdateLeadStatusInput } from '@case-clinical/api/lead-status/data-access' 
import { UserUpdateLeadSourceInput } from '@case-clinical/api/lead-source/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { UserUpdateBodyPartLeadInput } from '@case-clinical/api/body-part-lead/data-access' 
import { UserUpdateLeadActionInput } from '@case-clinical/api/lead-action/data-access' 
import { UserUpdateInsuranceInput } from '@case-clinical/api/insurance/data-access' 
import { UserUpdateLeadInjuryInput } from '@case-clinical/api/lead-injury/data-access' 
import { UserUpdateLeadTreatmentInput } from '@case-clinical/api/lead-treatment/data-access' 
import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class UserUpdateLeadInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateBodyPartLeadInput], { nullable: true }) 
  bodyPartsInjured?: UserUpdateBodyPartLeadInput[]

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

  @Field(() => [UserUpdateLeadActionInput], { nullable: true }) 
  leadActions?: UserUpdateLeadActionInput[]

  @Field({ nullable: true }) 
  leadSourceId?: string

  @Field({ nullable: true }) 
  submittedById?: string

  @Field(() => [UserUpdateInsuranceInput], { nullable: true }) 
  insurances?: UserUpdateInsuranceInput[]

  @Field(() => [UserUpdateLeadInjuryInput], { nullable: true }) 
  injuries?: UserUpdateLeadInjuryInput[]

  @Field(() => [UserUpdateLeadTreatmentInput], { nullable: true }) 
  treatments?: UserUpdateLeadTreatmentInput[]

  @Field({ nullable: true }) 
  legalCaseId?: string


  @Field(() => UserUpdateAccidentTypeInput ,{ nullable: true }) 
  accidentType?: UserUpdateAccidentTypeInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  driversLicense?: UserUpdateDocumentInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  policeReportAttachment?: UserUpdateDocumentInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  phoneRecording?: UserUpdateDocumentInput  


  @Field(() => UserUpdateLeadStatusInput ,{ nullable: true }) 
  status?: UserUpdateLeadStatusInput  


  @Field(() => UserUpdateLeadSourceInput ,{ nullable: true }) 
  sourceOfLead?: UserUpdateLeadSourceInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  submittedBy?: UserUpdateUserInput  

  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true })
  legalCase?: UserUpdateLegalCaseInput
}