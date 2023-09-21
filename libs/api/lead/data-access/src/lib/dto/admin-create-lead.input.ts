import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAccidentTypeInput } from '@case-clinical/api/accident-type/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreateLeadStatusInput } from '@case-clinical/api/lead-status/data-access' 
import { AdminCreateLeadSourceInput } from '@case-clinical/api/lead-source/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminCreateBodyPartLeadInput } from '@case-clinical/api/body-part-lead/data-access' 
import { AdminCreateLeadActionInput } from '@case-clinical/api/lead-action/data-access' 
import { AdminCreateInsuranceInput } from '@case-clinical/api/insurance/data-access' 
import { AdminCreateLeadInjuryInput } from '@case-clinical/api/lead-injury/data-access' 
import { AdminCreateLeadTreatmentInput } from '@case-clinical/api/lead-treatment/data-access' 


@InputType()
export class AdminCreateLeadInput {

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

  @Field(() => [AdminCreateBodyPartLeadInput], { nullable: true }) 
  bodyPartsInjured?: AdminCreateBodyPartLeadInput[]

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

  @Field(() => [AdminCreateLeadActionInput], { nullable: true }) 
  leadActions?: AdminCreateLeadActionInput[]

  @Field({ nullable: true }) 
  leadSourceId?: string

  @Field({ nullable: true }) 
  submittedById?: string

  @Field(() => [AdminCreateInsuranceInput], { nullable: true }) 
  insurances?: AdminCreateInsuranceInput[]

  @Field(() => [AdminCreateLeadInjuryInput], { nullable: true }) 
  injuries?: AdminCreateLeadInjuryInput[]

  @Field(() => [AdminCreateLeadTreatmentInput], { nullable: true }) 
  treatments?: AdminCreateLeadTreatmentInput[]

  @Field({ nullable: true }) 
  legalCaseId?: string


  @Field(() => AdminCreateAccidentTypeInput ,{ nullable: true }) 
  accidentType?: AdminCreateAccidentTypeInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  driversLicense?: AdminCreateDocumentInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  policeReportAttachment?: AdminCreateDocumentInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  phoneRecording?: AdminCreateDocumentInput  


  @Field(() => AdminCreateLeadStatusInput ,{ nullable: true }) 
  status?: AdminCreateLeadStatusInput  


  @Field(() => AdminCreateLeadSourceInput ,{ nullable: true }) 
  sourceOfLead?: AdminCreateLeadSourceInput  


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  submittedBy?: AdminCreateUserInput  

}