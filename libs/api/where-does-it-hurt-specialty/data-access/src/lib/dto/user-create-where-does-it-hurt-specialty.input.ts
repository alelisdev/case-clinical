import { Field, InputType } from '@nestjs/graphql'

import { UserCreateWhereDoesItHurtInput } from '@case-clinical/api/where-does-it-hurt/data-access' 
import { UserCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class UserCreateWhereDoesItHurtSpecialtyInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  whereDoesItHurtId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  ordinal?: number

  @Field(() => UserCreateWhereDoesItHurtInput ,{ nullable: true }) 
  whereDoesItHurt?: UserCreateWhereDoesItHurtInput  


  @Field(() => UserCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: UserCreateSpecialtyInput  

}
