import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateAccidentTypeInput } from '@case-clinical/api/accident-type/data-access' 
import { AdminUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminUpdateLeadStatusInput } from '@case-clinical/api/lead-status/data-access' 
import { AdminUpdateLeadSourceInput } from '@case-clinical/api/lead-source/data-access' 
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { UserUpdateBodyPartLeadInput } from '@case-clinical/api/body-part-lead/data-access' 
import { UserUpdateLeadActionInput } from '@case-clinical/api/lead-action/data-access' 
import { UserUpdateInsuranceInput } from '@case-clinical/api/insurance/data-access' 
import { UserUpdateLeadInjuryInput } from '@case-clinical/api/lead-injury/data-access' 
import { UserUpdateLeadTreatmentInput } from '@case-clinical/api/lead-treatment/data-access' 


@InputType()
export class AdminUpdateLeadInput {

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


  @Field(() => AdminUpdateAccidentTypeInput ,{ nullable: true }) 
  accidentType?: AdminUpdateAccidentTypeInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  driversLicense?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  policeReportAttachment?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  phoneRecording?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateLeadStatusInput ,{ nullable: true }) 
  status?: AdminUpdateLeadStatusInput  


  @Field(() => AdminUpdateLeadSourceInput ,{ nullable: true }) 
  sourceOfLead?: AdminUpdateLeadSourceInput  


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  submittedBy?: AdminUpdateUserInput  

}