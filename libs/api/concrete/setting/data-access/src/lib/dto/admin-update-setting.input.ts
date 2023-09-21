import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminUpdateSettingInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  

}