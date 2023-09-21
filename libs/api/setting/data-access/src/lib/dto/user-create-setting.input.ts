import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserCreateSettingInput {

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


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  

}
