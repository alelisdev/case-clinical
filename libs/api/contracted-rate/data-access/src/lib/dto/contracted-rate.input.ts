import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ContractedRateInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  amount?: number

  @Field({ nullable: true }) 
  percentage?: number

  @Field({ nullable: true }) 
  reimbursedRate?: number

  @Field({ nullable: true }) 
  billOnBehalf?: boolean

  @Field({ nullable: true }) 
  contractId?: string

  @Field({ nullable: true }) 
  contractedRateKindId?: string

  @Field({ nullable: true }) 
  contractKindId?: string

  @Field({ nullable: true }) 
  visitKindId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  specialtyId?: string
}
