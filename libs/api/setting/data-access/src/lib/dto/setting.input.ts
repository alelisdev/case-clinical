import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class SettingInput {

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
}
