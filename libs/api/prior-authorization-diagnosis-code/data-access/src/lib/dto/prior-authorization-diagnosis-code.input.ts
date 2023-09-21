import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PriorAuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string
}
