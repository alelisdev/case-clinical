import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateOrganizationInput } from '@case-clinical/api/organization/data-access'
import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access'
import { UserUpdateInvoiceDetailInput } from '@case-clinical/api/invoice-detail/data-access'


@InputType()
export class UserUpdateInvoiceInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  invoiceNumber?: string

  @Field({ nullable: true })
  amount?: number

  @Field({ nullable: true })
  paid?: number

  @Field({ nullable: true })
  due?: number

  @Field({ nullable: true })
  organizationId?: string

  @Field({ nullable: true })
  legalCaseId?: string

  @Field({ nullable: true })
  clinicalProviderId?: string

  @Field(() => [UserUpdateInvoiceDetailInput], { nullable: true })
  details?: UserUpdateInvoiceDetailInput[]

  @Field({ nullable: true })
  invoiceId?: string


  @Field(() => UserUpdateOrganizationInput ,{ nullable: true })
  billingOrganization?: UserUpdateOrganizationInput


  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true })
  legalCase?: UserUpdateLegalCaseInput

  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true })
  clinicalProvider?: UserUpdateClinicalProviderInput


  @Field(() => UserUpdateDocumentInput ,{ nullable: true })
  invoice?: UserUpdateDocumentInput

}
