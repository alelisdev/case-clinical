import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListCaseAccountPaymentInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  paymentId?: string  


  @Field({ nullable: true }) 
  caseAccountId?: string  


}
