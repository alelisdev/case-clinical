import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListInvoiceInput extends CorePagingInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  organizationId?: string

  @Field({ nullable: true })
  invoiceId?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  clinicalProviderId?: string

  @Field({ nullable: true })
  attorneyId?: string

  @Field({ nullable: true })
  firmId?: string

}
