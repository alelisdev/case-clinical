import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class MedicalRecordStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

}
