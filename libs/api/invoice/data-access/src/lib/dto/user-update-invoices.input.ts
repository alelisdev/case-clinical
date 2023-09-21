import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateInvoiceInput } from './user-update-invoice.input'

@InputType()
export class UserUpdateInvoicesInput {
  @Field(() => [UserUpdateInvoiceInput], {nullable: true }) 
  invoices: UserUpdateInvoiceInput[]
}
