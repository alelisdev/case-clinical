import { Field, ObjectType } from '@nestjs/graphql'

import { Appointment } from '@case-clinical/api/appointment/data-access' 


@ObjectType()
export class MedicalRecordStatus {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Appointment], { nullable: true }) 
  appointments?: Appointment[]


}
