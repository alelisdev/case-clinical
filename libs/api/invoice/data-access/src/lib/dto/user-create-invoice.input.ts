import { Field, InputType } from '@nestjs/graphql'

import { UserCreateOrganizationInput } from '@case-clinical/api/organization/data-access'
import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access'
import { UserCreateInvoiceDetailInput } from '@case-clinical/api/invoice-detail/data-access'


@InputType()
export class UserCreateInvoiceInput {

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

  @Field({ nullable: true })
  invoiceId?: string

  @Field(() => [UserCreateInvoiceDetailInput], { nullable: true })
  details?: UserCreateInvoiceDetailInput[]

  @Field(() => UserCreateOrganizationInput ,{ nullable: true })
  billingOrganization?: UserCreateOrganizationInput


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true })
  legalCase?: UserCreateLegalCaseInput

  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true })
  clinicalProvider?: UserCreateClinicalProviderInput

  @Field(() => UserCreateDocumentInput ,{ nullable: true })
  invoice?: UserCreateDocumentInput
}
