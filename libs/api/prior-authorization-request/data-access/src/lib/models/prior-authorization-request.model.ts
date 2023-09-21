import { Field, ObjectType } from '@nestjs/graphql'

import { ProcedureSite } from '@case-clinical/api/procedure-site/data-access'

import { SurgicalPosition } from '@case-clinical/api/surgical-position/data-access'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { Document } from '@case-clinical/api/document/data-access'

import { VisitKind } from '@case-clinical/api/visit-kind/data-access'

import { GuidelineUsed } from '@case-clinical/api/guideline-used/data-access'

import { AuthorizationKind } from '@case-clinical/api/authorization-kind/data-access'

import { AuthorizationStatus } from '@case-clinical/api/authorization-status/data-access'

import { Patient } from '@case-clinical/api/patient/data-access'

import { CaseProcedure } from '@case-clinical/api/case-procedure/data-access'
import { Claim } from '@case-clinical/api/claim/data-access' 
import { PriorAuthGuideline } from '@case-clinical/api/prior-auth-guideline/data-access' 
import { PriorAuthDme } from '@case-clinical/api/prior-auth-dme/data-access' 
import { PriorAuthorizationDiagnosisCode } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access' 
import { PriorAuthorizationEquipment } from '@case-clinical/api/prior-authorization-equipment/data-access' 
import { PriorAuthorizationImplant } from '@case-clinical/api/prior-authorization-implant/data-access' 
import { PriorAuthorizationProcedureCode } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 


@ObjectType()
export class PriorAuthorizationRequest {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [Claim], { nullable: true }) 
  claims?: Claim[]

  @Field(() => [PriorAuthGuideline], { nullable: true }) 
  guidelines?: PriorAuthGuideline[]

  @Field(() => [PriorAuthDme], { nullable: true }) 
  priorAuthDmes?: PriorAuthDme[]

  @Field(() => [PriorAuthorizationDiagnosisCode], { nullable: true }) 
  priorAuthorizationDiagnosisCodes?: PriorAuthorizationDiagnosisCode[]

  @Field(() => [PriorAuthorizationEquipment], { nullable: true }) 
  priorAuthorizationEquipments?: PriorAuthorizationEquipment[]

  @Field(() => [PriorAuthorizationImplant], { nullable: true }) 
  priorAuthorizationImplants?: PriorAuthorizationImplant[]

  @Field(() => [PriorAuthorizationProcedureCode], { nullable: true }) 
  priorAuthorizationProcedureCodes?: PriorAuthorizationProcedureCode[]

  @Field({ nullable: true }) 
  caseProcedureId?: string


  @Field(() => ProcedureSite, { nullable: true }) 
  procedureSite?: ProcedureSite  

  @Field(() => SurgicalPosition, { nullable: true }) 
  surgicalPosition?: SurgicalPosition  

  @Field(() => ClinicalProvider, { nullable: true }) 
  treatingProvider?: ClinicalProvider  

  @Field(() => ClinicalProvider, { nullable: true }) 
  referredTo?: ClinicalProvider  

  @Field(() => Document, { nullable: true }) 
  prescription?: Document  

  @Field(() => VisitKind, { nullable: true }) 
  visitKind?: VisitKind  

  @Field(() => GuidelineUsed, { nullable: true }) 
  guidelineUsed?: GuidelineUsed  

  @Field(() => AuthorizationKind, { nullable: true }) 
  authorizationKind?: AuthorizationKind  

  @Field(() => AuthorizationStatus, { nullable: true }) 
  authorizationStatus?: AuthorizationStatus  

  @Field(() => Document, { nullable: true }) 
  bill?: Document  

  @Field(() => Document, { nullable: true }) 
  medicalReport?: Document  

  @Field(() => Patient, { nullable: true }) 
  patient?: Patient  

  @Field(() => CaseProcedure, { nullable: true }) 
  caseProcedure?: CaseProcedure  

}
