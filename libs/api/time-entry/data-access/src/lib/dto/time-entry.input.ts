import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class TimeEntryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  date?: Date

  @Field({ nullable: true }) 
  rate?: number

  @Field({ nullable: true }) 
  hours?: number

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  isBilled?: boolean
}
