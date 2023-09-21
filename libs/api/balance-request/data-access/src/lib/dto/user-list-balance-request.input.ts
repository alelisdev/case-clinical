import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListBalanceRequestInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  statementId?: string  


  @Field({ nullable: true }) 
  legalCaseId?: string  


}
