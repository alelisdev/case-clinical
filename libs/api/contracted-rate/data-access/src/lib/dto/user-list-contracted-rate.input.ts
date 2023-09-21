import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListContractedRateInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  contractId?: string  


  @Field({ nullable: true }) 
  contractedRateKindId?: string  


  @Field({ nullable: true }) 
  contractKindId?: string  


  @Field({ nullable: true }) 
  visitKindId?: string  


  @Field({ nullable: true }) 
  clinicalProviderId?: string  


  @Field({ nullable: true }) 
  specialtyId?: string  


}
