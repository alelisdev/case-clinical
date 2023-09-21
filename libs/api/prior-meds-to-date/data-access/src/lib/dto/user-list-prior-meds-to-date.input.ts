import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListPriorMedsToDateInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  legalCaseId?: string  

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  visitKindId?: string

  @Field({ nullable: true }) 
  priorMedsToDateStatusId?: string  


}
