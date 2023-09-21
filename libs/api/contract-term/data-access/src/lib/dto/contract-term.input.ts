import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ContractTermInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  maxApproved?: number

  @Field({ nullable: true }) 
  numberIncluded?: number

  @Field({ nullable: true }) 
  factor?: number

  @Field({ nullable: true }) 
  contractTermId?: string
}
