import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateProcedureSiteInput } from '@case-clinical/api/procedure-site/data-access' 
import { AdminUpdateSurgicalPositionInput } from '@case-clinical/api/surgical-position/data-access' 
import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminUpdateVisitKindInput } from '@case-clinical/api/visit-kind/data-access' 
import { AdminUpdateGuidelineUsedInput } from '@case-clinical/api/guideline-used/data-access' 
import { AdminUpdateAuthorizationKindInput } from '@case-clinical/api/authorization-kind/data-access' 
import { AdminUpdateAuthorizationStatusInput } from '@case-clinical/api/authorization-status/data-access' 
import { AdminUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminUpdateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { UserUpdateClaimInput } from '@case-clinical/api/claim/data-access' 
import { UserUpdatePriorAuthGuidelineInput } from '@case-clinical/api/prior-auth-guideline/data-access' 
import { UserUpdatePriorAuthDmeInput } from '@case-clinical/api/prior-auth-dme/data-access' 
import { UserUpdatePriorAuthorizationDiagnosisCodeInput } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access' 
import { UserUpdatePriorAuthorizationEquipmentInput } from '@case-clinical/api/prior-authorization-equipment/data-access' 
import { UserUpdatePriorAuthorizationImplantInput } from '@case-clinical/api/prior-authorization-implant/data-access' 
import { UserUpdatePriorAuthorizationProcedureCodeInput } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 


@InputType()
export class AdminUpdatePriorAuthorizationRequestInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateClaimInput], { nullable: true }) 
  claims?: UserUpdateClaimInput[]

  @Field(() => [UserUpdatePriorAuthGuidelineInput], { nullable: true }) 
  guidelines?: UserUpdatePriorAuthGuidelineInput[]

  @Field(() => [UserUpdatePriorAuthDmeInput], { nullable: true }) 
  priorAuthDmes?: UserUpdatePriorAuthDmeInput[]

  @Field(() => [UserUpdatePriorAuthorizationDiagnosisCodeInput], { nullable: true }) 
  priorAuthorizationDiagnosisCodes?: UserUpdatePriorAuthorizationDiagnosisCodeInput[]

  @Field(() => [UserUpdatePriorAuthorizationEquipmentInput], { nullable: true }) 
  priorAuthorizationEquipments?: UserUpdatePriorAuthorizationEquipmentInput[]

  @Field(() => [UserUpdatePriorAuthorizationImplantInput], { nullable: true }) 
  priorAuthorizationImplants?: UserUpdatePriorAuthorizationImplantInput[]

  @Field(() => [UserUpdatePriorAuthorizationProcedureCodeInput], { nullable: true }) 
  priorAuthorizationProcedureCodes?: UserUpdatePriorAuthorizationProcedureCodeInput[]

  @Field({ nullable: true }) 
  caseProcedureId?: string


  @Field(() => AdminUpdateProcedureSiteInput ,{ nullable: true }) 
  procedureSite?: AdminUpdateProcedureSiteInput  


  @Field(() => AdminUpdateSurgicalPositionInput ,{ nullable: true }) 
  surgicalPosition?: AdminUpdateSurgicalPositionInput  


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  treatingProvider?: AdminUpdateClinicalProviderInput  


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  referredTo?: AdminUpdateClinicalProviderInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  prescription?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateVisitKindInput ,{ nullable: true }) 
  visitKind?: AdminUpdateVisitKindInput  


  @Field(() => AdminUpdateGuidelineUsedInput ,{ nullable: true }) 
  guidelineUsed?: AdminUpdateGuidelineUsedInput  


  @Field(() => AdminUpdateAuthorizationKindInput ,{ nullable: true }) 
  authorizationKind?: AdminUpdateAuthorizationKindInput  


  @Field(() => AdminUpdateAuthorizationStatusInput ,{ nullable: true }) 
  authorizationStatus?: AdminUpdateAuthorizationStatusInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  bill?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true }) 
  medicalReport?: AdminUpdateDocumentInput  


  @Field(() => AdminUpdatePatientInput ,{ nullable: true }) 
  patient?: AdminUpdatePatientInput  


  @Field(() => AdminUpdateCaseProcedureInput ,{ nullable: true }) 
  caseProcedure?: AdminUpdateCaseProcedureInput  

}