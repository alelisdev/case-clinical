import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateOrganizationInput } from '@case-clinical/api/organization/data-access'
import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateDocumentInput } from '@case-clinical/api/document/data-access'
import { UserUpdateInvoiceDetailInput } from '@case-clinical/api/invoice-detail/data-access'


@InputType()
export class AdminUpdateInvoiceInput {

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


  @Field(() => AdminUpdateOrganizationInput ,{ nullable: true })
  billingOrganization?: AdminUpdateOrganizationInput


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true })
  legalCase?: AdminUpdateLegalCaseInput

  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true })
  clinicalProvider?: AdminUpdateClinicalProviderInput


  @Field(() => AdminUpdateDocumentInput ,{ nullable: true })
  invoice?: AdminUpdateDocumentInput

}
