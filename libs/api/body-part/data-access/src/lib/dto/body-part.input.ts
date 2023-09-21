import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class BodyPartInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

}
