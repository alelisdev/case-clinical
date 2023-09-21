import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { UserUpdatePatientStudyInput } from '@case-clinical/api/patient-study/data-access' 
import { UserUpdateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 
import { UserUpdateMedicalConditionProviderInput } from '@case-clinical/api/medical-condition-provider/data-access' 
import { UserUpdateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserUpdatePrescriptionInput } from '@case-clinical/api/prescription/data-access' 
import { UserUpdateFirmInput } from '@case-clinical/api/firm/data-access' 


@InputType()
export class UserUpdateDocumentInput {

  @Field({ nullable: true }) 
  id?: string

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
  providerId?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  propertyDamageId?: string

  @Field({ nullable: true }) 
  miscellaneousId?: string

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
  patientStudyId?: string

  @Field({ nullable: true }) 
  procedureVendorId?: string

  @Field({ nullable: true }) 
  medicalConditionProviderId?: string

  @Field(() => [UserUpdateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserUpdateAssignedDocumentInput[]

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  medicalReports?: UserUpdatePriorAuthorizationRequestInput[]

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  bills?: UserUpdatePriorAuthorizationRequestInput[]

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: UserUpdatePriorAuthorizationRequestInput[]

  @Field(() => [UserUpdatePrescriptionInput], { nullable: true }) 
  prescriptions?: UserUpdatePrescriptionInput[]

  @Field(() => [UserUpdateFirmInput], { nullable: true }) 
  eulas?: UserUpdateFirmInput[]


  @Field(() => UserUpdateContractInput ,{ nullable: true }) 
  contract?: UserUpdateContractInput  


  @Field(() => UserUpdatePatientInput ,{ nullable: true }) 
  patient?: UserUpdatePatientInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  provider?: UserUpdateUserInput  


  @Field(() => UserUpdatePatientStudyInput ,{ nullable: true }) 
  patientStudies?: UserUpdatePatientStudyInput  


  @Field(() => UserUpdateProcedureVendorInput ,{ nullable: true }) 
  procedureVendor?: UserUpdateProcedureVendorInput  


  @Field(() => UserUpdateMedicalConditionProviderInput ,{ nullable: true }) 
  medicalConditionProvider?: UserUpdateMedicalConditionProviderInput  

}