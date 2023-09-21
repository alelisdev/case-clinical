import { Field, InputType } from '@nestjs/graphql'


@InputType()
export class ContractInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  organizationId?: string

  @Field({ nullable: true }) 
  billingOrganizationId?: string

  @Field({ nullable: true }) 
  templateId?: string

  @Field({ nullable: true }) 
  billOnBehalf?: boolean

  @Field({ nullable: true }) 
  billRate?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  contractDate?: Date

  @Field({ nullable: true }) 
  maturityDate?: Date

  @Field({ nullable: true }) 
  requiresTpaMedicalNecessity?: boolean

  @Field({ nullable: true }) 
  requiresTpaMedicareAllowable?: boolean

  @Field({ nullable: true }) 
  reconciliationPeriodTypeId?: string

  @Field({ nullable: true }) 
  calculationBasisTypeId?: string

  @Field({ nullable: true }) 
  signed?: boolean

  @Field({ nullable: true }) 
  processId?: string
}
