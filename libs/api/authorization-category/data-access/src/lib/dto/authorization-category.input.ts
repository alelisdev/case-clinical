import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AuthorizationCategoryInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

}
