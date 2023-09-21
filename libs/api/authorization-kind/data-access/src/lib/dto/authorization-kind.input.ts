import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AuthorizationKindInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  categoryId?: string

}
