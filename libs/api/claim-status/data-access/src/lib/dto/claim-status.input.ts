import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ClaimStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

}
