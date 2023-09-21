import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminCreateSettingInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  value?: string

  @Field({ nullable: true }) 
  dateFormat?: string

  @Field({ nullable: true }) 
  timeFormat?: string

  @Field({ nullable: true }) 
  startWeekOn?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  

}