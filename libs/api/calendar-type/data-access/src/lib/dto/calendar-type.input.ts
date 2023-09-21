import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class CalendarTypeInput {

  @Field({ nullable: true }) 
  name?: string

}
