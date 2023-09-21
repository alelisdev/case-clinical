import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class SpecialtyInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  active?: boolean



}
