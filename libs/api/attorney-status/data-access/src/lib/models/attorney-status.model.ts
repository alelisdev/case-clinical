import { Field, ObjectType } from '@nestjs/graphql'

import { Attorney } from '@case-clinical/api/attorney/data-access' 


@ObjectType()
export class AttorneyStatus {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Attorney], { nullable: true }) 
  attorneys?: Attorney[]


}
