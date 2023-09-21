import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 
import { UserCreatePatientStudyInput } from '@case-clinical/api/patient-study/data-access' 
import { UserCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 
import { UserCreateMedicalConditionProviderInput } from '@case-clinical/api/medical-condition-provider/data-access' 
import { UserCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserCreatePrescriptionInput } from '@case-clinical/api/prescription/data-access' 
import { UserCreateFirmInput } from '@case-clinical/api/firm/data-access' 


@InputType()
export class UserCreateDocumentInput {

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
  providerId?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  miscellaneousId?: string
  
  @Field({ nullable: true }) 
  propertyDamageId?: string
  

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

  @Field(() => [UserCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserCreateAssignedDocumentInput[]

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true }) 
  medicalReports?: UserCreatePriorAuthorizationRequestInput[]

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true }) 
  bills?: UserCreatePriorAuthorizationRequestInput[]

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: UserCreatePriorAuthorizationRequestInput[]

  @Field(() => [UserCreatePrescriptionInput], { nullable: true }) 
  prescriptions?: UserCreatePrescriptionInput[]

  @Field(() => [UserCreateFirmInput], { nullable: true }) 
  eulas?: UserCreateFirmInput[]


  @Field(() => UserCreateContractInput ,{ nullable: true }) 
  contract?: UserCreateContractInput  


  @Field(() => UserCreatePatientInput ,{ nullable: true }) 
  patient?: UserCreatePatientInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  provider?: UserCreateUserInput  


  @Field(() => UserCreatePatientStudyInput ,{ nullable: true }) 
  patientStudies?: UserCreatePatientStudyInput  


  @Field(() => UserCreateProcedureVendorInput ,{ nullable: true }) 
  procedureVendor?: UserCreateProcedureVendorInput  


  @Field(() => UserCreateMedicalConditionProviderInput ,{ nullable: true }) 
  medicalConditionProvider?: UserCreateMedicalConditionProviderInput  

}
