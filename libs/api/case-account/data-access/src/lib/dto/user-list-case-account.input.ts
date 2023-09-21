import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListCaseAccountInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  legalCaseId?: string  


  @Field({ nullable: true }) 
  locationId?: string  


  @Field({ nullable: true }) 
  vendorId?: string  


  @Field({ nullable: true }) 
  accountStatusId?: string  


  @Field({ nullable: true }) 
  procedureTypeId?: string  


  @Field({ nullable: true }) 
  agreementTypeId?: string  


  @Field({ nullable: true }) 
  claimProcedureId?: string  


  @Field({ nullable: true }) 
  invoiceDetailId?: string  


  @Field({ nullable: true }) 
  contractId?: string  


  @Field({ nullable: true }) 
  portfolioId?: string  


  @Field({ nullable: true }) 
  procedureVendorId?: string  


}
