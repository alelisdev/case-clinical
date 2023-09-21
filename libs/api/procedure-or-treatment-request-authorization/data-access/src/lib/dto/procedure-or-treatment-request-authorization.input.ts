import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ProcedureOrTreatmentRequestAuthorizationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string
}
