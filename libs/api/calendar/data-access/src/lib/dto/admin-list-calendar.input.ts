import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListCalendarInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string




  @Field({ nullable: true }) 
  userCalendarId?: string  
  
  @Field({ nullable: true }) 
  calendarId?: string  
  

  @Field({ nullable: true }) 
  appointmentId?: string  

}
