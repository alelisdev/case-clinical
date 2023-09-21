import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListProcedureVendorInput extends CorePagingInput {
  @Field({ nullable: true })
  name?: string


  @Field({ nullable: true })
  procedureId?: string

  @Field({ nullable: true })
  contractId?: string


  @Field({ nullable: true })
  vendorId?: string


  @Field({ nullable: true })
  statusId?: string


}
