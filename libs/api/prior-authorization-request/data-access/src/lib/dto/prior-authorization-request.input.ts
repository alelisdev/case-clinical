import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PriorAuthorizationRequestInput {

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








  @Field({ nullable: true }) 
  caseProcedureId?: string
}
