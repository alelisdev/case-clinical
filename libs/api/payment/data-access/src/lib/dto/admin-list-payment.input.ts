import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListPaymentInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  batchControlId?: string  


  @Field({ nullable: true }) 
  bankId?: string  


  @Field({ nullable: true }) 
  payorTypeId?: string  


  @Field({ nullable: true }) 
  paymentTypeId?: string  


  @Field({ nullable: true }) 
  paymentApplicationMethodId?: string  


}
