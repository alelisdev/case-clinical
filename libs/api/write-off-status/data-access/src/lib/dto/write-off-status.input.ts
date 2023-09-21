import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class WriteOffStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

}
