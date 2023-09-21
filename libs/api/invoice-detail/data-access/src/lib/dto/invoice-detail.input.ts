import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class InvoiceDetailInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  invoiceId?: string

  @Field({ nullable: true }) 
  dateOfService?: Date

  @Field({ nullable: true }) 
  providerName?: string

  @Field({ nullable: true }) 
  procedureDescription?: string

  @Field({ nullable: true }) 
  quantity?: number

  @Field({ nullable: true }) 
  charges?: number

  @Field({ nullable: true }) 
  lineTotal?: number

}
