import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AuthorizationTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

}
