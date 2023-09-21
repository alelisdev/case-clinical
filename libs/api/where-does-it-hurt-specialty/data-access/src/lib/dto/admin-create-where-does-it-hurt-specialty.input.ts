import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateWhereDoesItHurtInput } from '@case-clinical/api/where-does-it-hurt/data-access' 
import { AdminCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminCreateWhereDoesItHurtSpecialtyInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  whereDoesItHurtId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  ordinal?: number

  @Field(() => AdminCreateWhereDoesItHurtInput ,{ nullable: true }) 
  whereDoesItHurt?: AdminCreateWhereDoesItHurtInput  


  @Field(() => AdminCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminCreateSpecialtyInput  

}