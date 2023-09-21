import { Field, ObjectType } from '@nestjs/graphql'

import { AccidentType } from '@case-clinical/api/accident-type/data-access'

import { Document } from '@case-clinical/api/document/data-access'

import { LeadStatus } from '@case-clinical/api/lead-status/data-access'

import { LeadSource } from '@case-clinical/api/lead-source/data-access'

import { User } from '@case-clinical/api/user/data-access'
import { BodyPartLead } from '@case-clinical/api/body-part-lead/data-access' 
import { LeadAction } from '@case-clinical/api/lead-action/data-access' 
import { Insurance } from '@case-clinical/api/insurance/data-access' 
import { LeadInjury } from '@case-clinical/api/lead-injury/data-access' 
import { LeadTreatment } from '@case-clinical/api/lead-treatment/data-access' 


@ObjectType()
export class Lead {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [BodyPartLead], { nullable: true }) 
  bodyPartsInjured?: BodyPartLead[]

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

  @Field(() => [LeadAction], { nullable: true }) 
  leadActions?: LeadAction[]

  @Field({ nullable: true }) 
  leadSourceId?: string

  @Field({ nullable: true }) 
  submittedById?: string

  @Field(() => [Insurance], { nullable: true }) 
  insurances?: Insurance[]

  @Field(() => [LeadInjury], { nullable: true }) 
  injuries?: LeadInjury[]

  @Field(() => [LeadTreatment], { nullable: true }) 
  treatments?: LeadTreatment[]

  @Field({ nullable: true }) 
  legalCaseId?: string


  @Field(() => AccidentType, { nullable: true }) 
  accidentType?: AccidentType  

  @Field(() => Document, { nullable: true }) 
  driversLicense?: Document  

  @Field(() => Document, { nullable: true }) 
  policeReportAttachment?: Document  

  @Field(() => Document, { nullable: true }) 
  phoneRecording?: Document  

  @Field(() => LeadStatus, { nullable: true }) 
  status?: LeadStatus  

  @Field(() => LeadSource, { nullable: true }) 
  sourceOfLead?: LeadSource  

  @Field(() => User, { nullable: true }) 
  submittedBy?: User  

}
