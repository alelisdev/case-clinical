import { Field, ObjectType } from '@nestjs/graphql'

import { Contract } from '@case-clinical/api/contract/data-access'

import { Patient } from '@case-clinical/api/patient/data-access'

import { User } from '@case-clinical/api/user/data-access'

import { PatientStudy } from '@case-clinical/api/patient-study/data-access'

import { ProcedureVendor } from '@case-clinical/api/procedure-vendor/data-access'

import { MedicalConditionProvider } from '@case-clinical/api/medical-condition-provider/data-access'
import { AssignedDocument } from '@case-clinical/api/assigned-document/data-access' 
import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access' 
import { Prescription } from '@case-clinical/api/prescription/data-access' 
import { Firm } from '@case-clinical/api/firm/data-access' 


@ObjectType()
export class Document {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  attachment?: string

  @Field({ nullable: true }) 
  encoding?: string

  @Field({ nullable: true }) 
  extension?: string

  @Field({ nullable: true }) 
  parentId?: string

  @Field({ nullable: true }) 
  folderId?: string

  @Field({ nullable: true }) 
  createdBy?: string

  @Field({ nullable: true }) 
  size?: number

  @Field({ nullable: true }) 
  type?: string

  @Field({ nullable: true }) 
  contents?: string

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  userId?: string
  
 
  @Field({ nullable: true }) 
  contractId?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  prescriptionId?: string

  @Field({ nullable: true }) 
  providerId?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  miscellaneousId?: string

  @Field({ nullable: true }) 
  propertyDamageId?: string

  @Field({ nullable: true }) 
  patientStudyId?: string

  @Field({ nullable: true }) 
  procedureVendorId?: string

  @Field({ nullable: true }) 
  medicalConditionProviderId?: string

  @Field(() => [AssignedDocument], { nullable: true }) 
  assignedDocuments?: AssignedDocument[]

  @Field(() => [PriorAuthorizationRequest], { nullable: true }) 
  medicalReports?: PriorAuthorizationRequest[]

  @Field(() => [PriorAuthorizationRequest], { nullable: true }) 
  bills?: PriorAuthorizationRequest[]

  @Field(() => [PriorAuthorizationRequest], { nullable: true }) 
  priorAuthorizationRequests?: PriorAuthorizationRequest[]

  @Field(() => [Prescription], { nullable: true }) 
  prescriptions?: Prescription[]

  @Field(() => [Firm], { nullable: true }) 
  eulas?: Firm[]


  @Field(() => Contract, { nullable: true }) 
  contract?: Contract  

  @Field(() => Patient, { nullable: true }) 
  patient?: Patient  

  @Field(() => User, { nullable: true }) 
  provider?: User  

  @Field(() => PatientStudy, { nullable: true }) 
  patientStudies?: PatientStudy  

  @Field(() => ProcedureVendor, { nullable: true }) 
  procedureVendor?: ProcedureVendor  

  @Field(() => MedicalConditionProvider, { nullable: true }) 
  medicalConditionProvider?: MedicalConditionProvider  

}
