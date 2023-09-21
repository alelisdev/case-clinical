import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '@case-clinical/api/user/data-access'


@ObjectType()
export class Setting {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => User, { nullable: true }) 
  user?: User  

}
