import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateWhereDoesItHurtInput } from '@case-clinical/api/where-does-it-hurt/data-access' 
import { AdminUpdateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminUpdateWhereDoesItHurtSpecialtyInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  whereDoesItHurtId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  ordinal?: number

  @Field(() => AdminUpdateWhereDoesItHurtInput ,{ nullable: true }) 
  whereDoesItHurt?: AdminUpdateWhereDoesItHurtInput  


  @Field(() => AdminUpdateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminUpdateSpecialtyInput  

}