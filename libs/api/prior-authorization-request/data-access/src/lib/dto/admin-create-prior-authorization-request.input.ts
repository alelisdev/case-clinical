import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateProcedureSiteInput } from '@case-clinical/api/procedure-site/data-access' 
import { AdminCreateSurgicalPositionInput } from '@case-clinical/api/surgical-position/data-access' 
import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreateVisitKindInput } from '@case-clinical/api/visit-kind/data-access' 
import { AdminCreateGuidelineUsedInput } from '@case-clinical/api/guideline-used/data-access' 
import { AdminCreateAuthorizationKindInput } from '@case-clinical/api/authorization-kind/data-access' 
import { AdminCreateAuthorizationStatusInput } from '@case-clinical/api/authorization-status/data-access' 
import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { AdminCreateClaimInput } from '@case-clinical/api/claim/data-access' 
import { AdminCreatePriorAuthGuidelineInput } from '@case-clinical/api/prior-auth-guideline/data-access' 
import { AdminCreatePriorAuthDmeInput } from '@case-clinical/api/prior-auth-dme/data-access' 
import { AdminCreatePriorAuthorizationDiagnosisCodeInput } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access' 
import { AdminCreatePriorAuthorizationEquipmentInput } from '@case-clinical/api/prior-authorization-equipment/data-access' 
import { AdminCreatePriorAuthorizationImplantInput } from '@case-clinical/api/prior-authorization-implant/data-access' 
import { AdminCreatePriorAuthorizationProcedureCodeInput } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 


@InputType()
export class AdminCreatePriorAuthorizationRequestInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  referredOn?: Date

  @Field({ nullable: true }) 
  approvedOn?: Date

  @Field({ nullable: true }) 
  effectiveAsOf?: Date

  @Field({ nullable: true }) 
  expiresOn?: Date

  @Field({ nullable: true }) 
  duration?: number

  @Field({ nullable: true }) 
  procedureSiteId?: string

  @Field({ nullable: true }) 
  surgicalPositionId?: string

  @Field({ nullable: true }) 
  procedureDescription?: string

  @Field({ nullable: true }) 
  remarks?: string

  @Field({ nullable: true }) 
  underwritingApproved?: boolean

  @Field({ nullable: true }) 
  tpaApproved?: boolean

  @Field({ nullable: true }) 
  requiresMedicalDirector?: boolean

  @Field({ nullable: true }) 
  reviewedOn?: Date

  @Field({ nullable: true }) 
  treatingProviderId?: string

  @Field({ nullable: true }) 
  referredToId?: string

  @Field({ nullable: true }) 
  priorAuthorizationNumber?: string

  @Field({ nullable: true }) 
  caseManager?: string

  @Field({ nullable: true }) 
  memberNumber?: string

  @Field({ nullable: true }) 
  medicalDirector?: string

  @Field({ nullable: true }) 
  tpaApprover?: string

  @Field({ nullable: true }) 
  underwriter?: string

  @Field({ nullable: true }) 
  prescriptionId?: string

  @Field({ nullable: true }) 
  visitKindId?: string

  @Field({ nullable: true }) 
  guidelineUsedId?: string

  @Field({ nullable: true }) 
  guidelineRequires?: string

  @Field({ nullable: true }) 
  authorizationKindId?: string

  @Field({ nullable: true }) 
  authorizationStatusId?: string

  @Field({ nullable: true }) 
  billId?: string

  @Field({ nullable: true }) 
  medicalReportId?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field(() => [AdminCreateClaimInput], { nullable: true }) 
  claims?: AdminCreateClaimInput[]

  @Field(() => [AdminCreatePriorAuthGuidelineInput], { nullable: true }) 
  guidelines?: AdminCreatePriorAuthGuidelineInput[]

  @Field(() => [AdminCreatePriorAuthDmeInput], { nullable: true }) 
  priorAuthDmes?: AdminCreatePriorAuthDmeInput[]

  @Field(() => [AdminCreatePriorAuthorizationDiagnosisCodeInput], { nullable: true }) 
  priorAuthorizationDiagnosisCodes?: AdminCreatePriorAuthorizationDiagnosisCodeInput[]

  @Field(() => [AdminCreatePriorAuthorizationEquipmentInput], { nullable: true }) 
  priorAuthorizationEquipments?: AdminCreatePriorAuthorizationEquipmentInput[]

  @Field(() => [AdminCreatePriorAuthorizationImplantInput], { nullable: true }) 
  priorAuthorizationImplants?: AdminCreatePriorAuthorizationImplantInput[]

  @Field(() => [AdminCreatePriorAuthorizationProcedureCodeInput], { nullable: true }) 
  priorAuthorizationProcedureCodes?: AdminCreatePriorAuthorizationProcedureCodeInput[]

  @Field({ nullable: true }) 
  caseProcedureId?: string


  @Field(() => AdminCreateProcedureSiteInput ,{ nullable: true }) 
  procedureSite?: AdminCreateProcedureSiteInput  


  @Field(() => AdminCreateSurgicalPositionInput ,{ nullable: true }) 
  surgicalPosition?: AdminCreateSurgicalPositionInput  


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  treatingProvider?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  referredTo?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  prescription?: AdminCreateDocumentInput  


  @Field(() => AdminCreateVisitKindInput ,{ nullable: true }) 
  visitKind?: AdminCreateVisitKindInput  


  @Field(() => AdminCreateGuidelineUsedInput ,{ nullable: true }) 
  guidelineUsed?: AdminCreateGuidelineUsedInput  


  @Field(() => AdminCreateAuthorizationKindInput ,{ nullable: true }) 
  authorizationKind?: AdminCreateAuthorizationKindInput  


  @Field(() => AdminCreateAuthorizationStatusInput ,{ nullable: true }) 
  authorizationStatus?: AdminCreateAuthorizationStatusInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  bill?: AdminCreateDocumentInput  


  @Field(() => AdminCreateDocumentInput ,{ nullable: true }) 
  medicalReport?: AdminCreateDocumentInput  


  @Field(() => AdminCreatePatientInput ,{ nullable: true }) 
  patient?: AdminCreatePatientInput  


  @Field(() => AdminCreateCaseProcedureInput ,{ nullable: true }) 
  caseProcedure?: AdminCreateCaseProcedureInput  

}