import { Field, ObjectType } from '@nestjs/graphql'

import { Patient } from '@case-clinical/api/patient/data-access' 


@ObjectType()
export class Ethnicity {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Patient], { nullable: true }) 
  patients?: Patient[]


}
