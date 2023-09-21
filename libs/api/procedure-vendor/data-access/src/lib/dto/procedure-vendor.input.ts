import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ProcedureVendorInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  procedureId?: string

  @Field({ nullable: true }) 
  contractId?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  statusId?: string

  @Field({ nullable: true }) 
  estimate?: number

  @Field({ nullable: true }) 
  fundingApproved?: boolean


}
