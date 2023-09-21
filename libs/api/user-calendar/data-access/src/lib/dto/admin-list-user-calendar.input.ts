import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListUserCalendarInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  calendarTypeId?: string  


  @Field({ nullable: true }) 
  userId?: string  


  @Field({ nullable: true }) 
  teamId?: string  


  @Field({ nullable: true }) 
  calendarId?: string  



}
