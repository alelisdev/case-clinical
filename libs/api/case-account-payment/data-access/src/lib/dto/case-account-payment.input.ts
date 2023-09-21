import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class CaseAccountPaymentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  amountApplied?: number

  @Field({ nullable: true }) 
  paymentId?: string

  @Field({ nullable: true }) 
  caseAccountId?: string
}
