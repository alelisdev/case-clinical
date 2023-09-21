import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ProcessInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

}
