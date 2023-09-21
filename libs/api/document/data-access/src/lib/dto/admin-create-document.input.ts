import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminCreatePatientStudyInput } from '@case-clinical/api/patient-study/data-access' 
import { AdminCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 
import { AdminCreateMedicalConditionProviderInput } from '@case-clinical/api/medical-condition-provider/data-access' 
import { AdminCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 
import { AdminCreatePrescriptionInput } from '@case-clinical/api/prescription/data-access' 
import { AdminCreateFirmInput } from '@case-clinical/api/firm/data-access' 


@InputType()
export class AdminCreateDocumentInput {

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

  @Field(() => [AdminCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: AdminCreateAssignedDocumentInput[]

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  medicalReports?: AdminCreatePriorAuthorizationRequestInput[]

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  bills?: AdminCreatePriorAuthorizationRequestInput[]

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: AdminCreatePriorAuthorizationRequestInput[]

  @Field(() => [AdminCreatePrescriptionInput], { nullable: true }) 
  prescriptions?: AdminCreatePrescriptionInput[]

  @Field(() => [AdminCreateFirmInput], { nullable: true }) 
  eulas?: AdminCreateFirmInput[]


  @Field(() => AdminCreateContractInput ,{ nullable: true }) 
  contract?: AdminCreateContractInput  


  @Field(() => AdminCreatePatientInput ,{ nullable: true }) 
  patient?: AdminCreatePatientInput  


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  provider?: AdminCreateUserInput  


  @Field(() => AdminCreatePatientStudyInput ,{ nullable: true }) 
  patientStudies?: AdminCreatePatientStudyInput  


  @Field(() => AdminCreateProcedureVendorInput ,{ nullable: true }) 
  procedureVendor?: AdminCreateProcedureVendorInput  


  @Field(() => AdminCreateMedicalConditionProviderInput ,{ nullable: true }) 
  medicalConditionProvider?: AdminCreateMedicalConditionProviderInput  

}