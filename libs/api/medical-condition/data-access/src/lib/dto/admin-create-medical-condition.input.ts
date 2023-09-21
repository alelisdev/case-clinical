import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AdminCreateMedicalConditionInput {

  @Field({ nullable: true }) 
  name?: string


}