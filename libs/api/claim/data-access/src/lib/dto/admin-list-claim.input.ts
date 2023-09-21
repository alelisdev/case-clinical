import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListClaimInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  priorAuthorizationRequestId?: string  


  @Field({ nullable: true }) 
  claimId?: string  


  @Field({ nullable: true }) 
  explanationOfPaymentId?: string  


  @Field({ nullable: true }) 
  patientId?: string  


}
