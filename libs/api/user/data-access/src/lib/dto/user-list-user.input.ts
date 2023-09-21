import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListUserInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  patientId?: string  


  @Field({ nullable: true }) 
  providerId?: string  


  @Field({ nullable: true }) 
  attorneyId?: string  


}
