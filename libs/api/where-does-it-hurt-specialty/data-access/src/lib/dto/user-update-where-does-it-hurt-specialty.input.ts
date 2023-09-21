import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateWhereDoesItHurtInput } from '@case-clinical/api/where-does-it-hurt/data-access' 
import { UserUpdateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class UserUpdateWhereDoesItHurtSpecialtyInput {

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

  @Field(() => UserUpdateWhereDoesItHurtInput ,{ nullable: true }) 
  whereDoesItHurt?: UserUpdateWhereDoesItHurtInput  


  @Field(() => UserUpdateSpecialtyInput ,{ nullable: true }) 
  specialty?: UserUpdateSpecialtyInput  

}