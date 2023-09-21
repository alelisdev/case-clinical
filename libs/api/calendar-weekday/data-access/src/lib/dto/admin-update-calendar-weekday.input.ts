import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AdminUpdateCalendarWeekdayInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  abbr?: string

  @Field({ nullable: true }) 
  label?: string

  @Field({ nullable: true }) 
  value?: string

}