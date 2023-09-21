import { Field, ObjectType } from '@nestjs/graphql'



@ObjectType()
export class CalendarWeekday {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  abbr?: string

  @Field({ nullable: true }) 
  label?: string

  @Field({ nullable: true }) 
  value?: string

}
