import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateContractInput } from '@case-clinical/api/contract/data-access' 
import { AdminUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminUpdatePatientStudyInput } from '@case-clinical/api/patient-study/data-access' 
import { AdminUpdateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 
import { AdminUpdateMedicalConditionProviderInput } from '@case-clinical/api/medical-condition-provider/data-access' 
import { UserUpdateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { UserUpdatePrescriptionInput } from '@case-clinical/api/prescription/data-access' 
import { UserUpdateFirmInput } from '@case-clinical/api/firm/data-access' 


@InputType()
export class AdminUpdateDocumentInput {

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
  contractId?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  providerId?: string

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


  @Field(() => AdminUpdateContractInput ,{ nullable: true }) 
  contract?: AdminUpdateContractInput  


  @Field(() => AdminUpdatePatientInput ,{ nullable: true }) 
  patient?: AdminUpdatePatientInput  


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  provider?: AdminUpdateUserInput  


  @Field(() => AdminUpdatePatientStudyInput ,{ nullable: true }) 
  patientStudies?: AdminUpdatePatientStudyInput  


  @Field(() => AdminUpdateProcedureVendorInput ,{ nullable: true }) 
  procedureVendor?: AdminUpdateProcedureVendorInput  


  @Field(() => AdminUpdateMedicalConditionProviderInput ,{ nullable: true }) 
  medicalConditionProvider?: AdminUpdateMedicalConditionProviderInput  

}