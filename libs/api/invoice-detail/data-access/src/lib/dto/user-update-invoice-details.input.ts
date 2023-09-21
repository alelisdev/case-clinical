import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateInvoiceDetailInput } from './user-update-invoice-detail.input'

@InputType()
export class UserUpdateInvoiceDetailsInput {
  @Field(() => [UserUpdateInvoiceDetailInput], {nullable: true }) 
  invoiceDetails: UserUpdateInvoiceDetailInput[]
}
