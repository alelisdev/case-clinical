import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateProcedureSiteInput } from '@case-clinical/api/procedure-site/data-access' 
import { UserUpdateSurgicalPositionInput } from '@case-clinical/api/surgical-position/data-access' 
import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserUpdateVisitKindInput } from '@case-clinical/api/visit-kind/data-access' 
import { UserUpdateGuidelineUsedInput } from '@case-clinical/api/guideline-used/data-access' 
import { UserUpdateAuthorizationKindInput } from '@case-clinical/api/authorization-kind/data-access' 
import { UserUpdateAuthorizationStatusInput } from '@case-clinical/api/authorization-status/data-access' 
import { UserUpdatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserUpdateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { UserUpdateClaimInput } from '@case-clinical/api/claim/data-access' 
import { UserUpdatePriorAuthGuidelineInput } from '@case-clinical/api/prior-auth-guideline/data-access' 
import { UserUpdatePriorAuthDmeInput } from '@case-clinical/api/prior-auth-dme/data-access' 
import { UserUpdatePriorAuthorizationDiagnosisCodeInput } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access' 
import { UserUpdatePriorAuthorizationEquipmentInput } from '@case-clinical/api/prior-authorization-equipment/data-access' 
import { UserUpdatePriorAuthorizationImplantInput } from '@case-clinical/api/prior-authorization-implant/data-access' 
import { UserUpdatePriorAuthorizationProcedureCodeInput } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 


@InputType()
export class UserUpdatePriorAuthorizationRequestInput {

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


  @Field(() => UserUpdateProcedureSiteInput ,{ nullable: true }) 
  procedureSite?: UserUpdateProcedureSiteInput  


  @Field(() => UserUpdateSurgicalPositionInput ,{ nullable: true }) 
  surgicalPosition?: UserUpdateSurgicalPositionInput  


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  treatingProvider?: UserUpdateClinicalProviderInput  


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  referredTo?: UserUpdateClinicalProviderInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  prescription?: UserUpdateDocumentInput  


  @Field(() => UserUpdateVisitKindInput ,{ nullable: true }) 
  visitKind?: UserUpdateVisitKindInput  


  @Field(() => UserUpdateGuidelineUsedInput ,{ nullable: true }) 
  guidelineUsed?: UserUpdateGuidelineUsedInput  


  @Field(() => UserUpdateAuthorizationKindInput ,{ nullable: true }) 
  authorizationKind?: UserUpdateAuthorizationKindInput  


  @Field(() => UserUpdateAuthorizationStatusInput ,{ nullable: true }) 
  authorizationStatus?: UserUpdateAuthorizationStatusInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  bill?: UserUpdateDocumentInput  


  @Field(() => UserUpdateDocumentInput ,{ nullable: true }) 
  medicalReport?: UserUpdateDocumentInput  


  @Field(() => UserUpdatePatientInput ,{ nullable: true }) 
  patient?: UserUpdatePatientInput  


  @Field(() => UserUpdateCaseProcedureInput ,{ nullable: true }) 
  caseProcedure?: UserUpdateCaseProcedureInput  

}