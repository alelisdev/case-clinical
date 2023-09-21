import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class MedicalRecordInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  description?: string
}
