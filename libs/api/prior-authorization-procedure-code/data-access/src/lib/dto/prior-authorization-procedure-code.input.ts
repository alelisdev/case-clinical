import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PriorAuthorizationProcedureCodeInput {

  @Field({ nullable: true }) 
  procedureId?: string

  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  costCategoryId?: string

  @Field({ nullable: true }) 
  estimatedCost?: number
}
