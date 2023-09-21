import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class CalendarInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  color?: string

  @Field({ nullable: true }) 
  visible?: boolean


}
