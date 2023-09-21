import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ContractedRateKindInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  value?: number

}
