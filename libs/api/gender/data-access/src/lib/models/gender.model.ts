import { Field, ObjectType } from '@nestjs/graphql'

import { Patient } from '@case-clinical/api/patient/data-access' 


@ObjectType()
export class Gender {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  value?: number

  @Field(() => [Patient], { nullable: true }) 
  patients?: Patient[]


}
