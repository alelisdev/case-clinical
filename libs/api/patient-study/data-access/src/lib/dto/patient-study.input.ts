import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PatientStudyInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

}
