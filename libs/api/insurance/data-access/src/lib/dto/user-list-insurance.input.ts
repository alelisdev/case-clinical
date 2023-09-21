import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListInsuranceInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  legalCaseId?: string  


  @Field({ nullable: true }) 
  insuranceTypeId?: string  


  @Field({ nullable: true }) 
  insuranceSectorId?: string  


  @Field({ nullable: true }) 
  leadId?: string  


}
