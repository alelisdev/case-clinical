import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class UserCreateMedicalConditionInput {

  @Field({ nullable: true }) 
  name?: string


}
