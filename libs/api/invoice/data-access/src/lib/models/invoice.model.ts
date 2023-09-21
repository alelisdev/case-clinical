import { Field, ObjectType } from '@nestjs/graphql'

import { Organization } from '@case-clinical/api/organization/data-access'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'
import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { Document } from '@case-clinical/api/document/data-access'
import { InvoiceDetail } from '@case-clinical/api/invoice-detail/data-access'


@ObjectType()
export class Invoice {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

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

  @Field(() => [InvoiceDetail], { nullable: true })
  details?: InvoiceDetail[]

  @Field(() => Organization, { nullable: true })
  billingOrganization?: Organization

  @Field(() => LegalCase, { nullable: true })
  legalCase?: LegalCase

  @Field(() => ClinicalProvider, { nullable: true })
  clinicalProvider?: ClinicalProvider

  @Field(() => Document, { nullable: true })
  invoice?: Document

}
