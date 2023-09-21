import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class CaseProcedureInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field({ nullable: true })
  procedureStatusId?: string

  @Field({ nullable: true })
  locationId?: string

  @Field({ nullable: true })
  procedureTypeId?: string


  @Field({ nullable: true })
  procedureDate?: Date

  @Field({ nullable: true })
  cost?: number

  @Field({ nullable: true })
  notes?: string

  @Field({ nullable: true })
  createdBy?: string

  @Field({ nullable: true })
  dateCreated?: Date

  @Field({ nullable: true })
  removed?: boolean

  @Field({ nullable: true })
  approvedDate?: Date

  @Field({ nullable: true })
  procedureReasonName?: string

  @Field({ nullable: true })
  decisionDate?: Date

  @Field({ nullable: true })
  nextActionDate?: Date

}
