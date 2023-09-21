import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class IntegrationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

}
