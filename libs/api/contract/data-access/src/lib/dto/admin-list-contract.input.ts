import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListContractInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  organizationId?: string  


  @Field({ nullable: true }) 
  billingOrganizationId?: string  


  @Field({ nullable: true }) 
  templateId?: string  


  @Field({ nullable: true }) 
  vendorId?: string  


  @Field({ nullable: true }) 
  reconciliationPeriodTypeId?: string  


  @Field({ nullable: true }) 
  calculationBasisTypeId?: string  


  @Field({ nullable: true }) 
  processId?: string  


}
