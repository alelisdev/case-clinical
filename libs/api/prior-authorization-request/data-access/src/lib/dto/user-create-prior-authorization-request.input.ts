import { Field, InputType } from '@nestjs/graphql'

import { UserCreateProcedureSiteInput } from '@case-clinical/api/procedure-site/data-access' 
import { UserCreateSurgicalPositionInput } from '@case-clinical/api/surgical-position/data-access' 
import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserCreateVisitKindInput } from '@case-clinical/api/visit-kind/data-access' 
import { UserCreateGuidelineUsedInput } from '@case-clinical/api/guideline-used/data-access' 
import { UserCreateAuthorizationKindInput } from '@case-clinical/api/authorization-kind/data-access' 
import { UserCreateAuthorizationStatusInput } from '@case-clinical/api/authorization-status/data-access' 
import { UserCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { UserCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { UserCreateClaimInput } from '@case-clinical/api/claim/data-access' 
import { UserCreatePriorAuthGuidelineInput } from '@case-clinical/api/prior-auth-guideline/data-access' 
import { UserCreatePriorAuthDmeInput } from '@case-clinical/api/prior-auth-dme/data-access' 
import { UserCreatePriorAuthorizationDiagnosisCodeInput } from '@case-clinical/api/prior-authorization-diagnosis-code/data-access' 
import { UserCreatePriorAuthorizationEquipmentInput } from '@case-clinical/api/prior-authorization-equipment/data-access' 
import { UserCreatePriorAuthorizationImplantInput } from '@case-clinical/api/prior-authorization-implant/data-access' 
import { UserCreatePriorAuthorizationProcedureCodeInput } from '@case-clinical/api/prior-authorization-procedure-code/data-access' 


@InputType()
export class UserCreatePriorAuthorizationRequestInput {

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

  @Field(() => [UserCreateClaimInput], { nullable: true }) 
  claims?: UserCreateClaimInput[]

  @Field(() => [UserCreatePriorAuthGuidelineInput], { nullable: true }) 
  guidelines?: UserCreatePriorAuthGuidelineInput[]

  @Field(() => [UserCreatePriorAuthDmeInput], { nullable: true }) 
  priorAuthDmes?: UserCreatePriorAuthDmeInput[]

  @Field(() => [UserCreatePriorAuthorizationDiagnosisCodeInput], { nullable: true }) 
  priorAuthorizationDiagnosisCodes?: UserCreatePriorAuthorizationDiagnosisCodeInput[]

  @Field(() => [UserCreatePriorAuthorizationEquipmentInput], { nullable: true }) 
  priorAuthorizationEquipments?: UserCreatePriorAuthorizationEquipmentInput[]

  @Field(() => [UserCreatePriorAuthorizationImplantInput], { nullable: true }) 
  priorAuthorizationImplants?: UserCreatePriorAuthorizationImplantInput[]

  @Field(() => [UserCreatePriorAuthorizationProcedureCodeInput], { nullable: true }) 
  priorAuthorizationProcedureCodes?: UserCreatePriorAuthorizationProcedureCodeInput[]

  @Field({ nullable: true }) 
  caseProcedureId?: string


  @Field(() => UserCreateProcedureSiteInput ,{ nullable: true }) 
  procedureSite?: UserCreateProcedureSiteInput  


  @Field(() => UserCreateSurgicalPositionInput ,{ nullable: true }) 
  surgicalPosition?: UserCreateSurgicalPositionInput  


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  treatingProvider?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  referredTo?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  prescription?: UserCreateDocumentInput  


  @Field(() => UserCreateVisitKindInput ,{ nullable: true }) 
  visitKind?: UserCreateVisitKindInput  


  @Field(() => UserCreateGuidelineUsedInput ,{ nullable: true }) 
  guidelineUsed?: UserCreateGuidelineUsedInput  


  @Field(() => UserCreateAuthorizationKindInput ,{ nullable: true }) 
  authorizationKind?: UserCreateAuthorizationKindInput  


  @Field(() => UserCreateAuthorizationStatusInput ,{ nullable: true }) 
  authorizationStatus?: UserCreateAuthorizationStatusInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  bill?: UserCreateDocumentInput  


  @Field(() => UserCreateDocumentInput ,{ nullable: true }) 
  medicalReport?: UserCreateDocumentInput  


  @Field(() => UserCreatePatientInput ,{ nullable: true }) 
  patient?: UserCreatePatientInput  


  @Field(() => UserCreateCaseProcedureInput ,{ nullable: true }) 
  caseProcedure?: UserCreateCaseProcedureInput  

}
