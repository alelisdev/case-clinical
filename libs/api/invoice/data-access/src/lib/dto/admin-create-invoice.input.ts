import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateOrganizationInput } from '@case-clinical/api/organization/data-access'
import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminCreateInvoiceDetailInput } from '@case-clinical/api/invoice-detail/data-access'


@InputType()
export class AdminCreateInvoiceInput {

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

  @Field(() => [AdminCreateInvoiceDetailInput], { nullable: true })
  details?: AdminCreateInvoiceDetailInput[]

  @Field({ nullable: true })
  invoiceId?: string


  @Field(() => AdminCreateOrganizationInput ,{ nullable: true })
  billingOrganization?: AdminCreateOrganizationInput


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true })
  legalCase?: AdminCreateLegalCaseInput

  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true })
  clinicalProvider?: AdminCreateClinicalProviderInput


  @Field(() => AdminCreateDocumentInput ,{ nullable: true })
  invoice?: AdminCreateDocumentInput

}
