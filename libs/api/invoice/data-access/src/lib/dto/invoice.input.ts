import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class InvoiceInput {

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

  @Field({ nullable: true })
  invoiceId?: string
}
