import { Field, InputType } from '@nestjs/graphql'

import { UserCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserCreateInsuranceTypeInput } from '@case-clinical/api/insurance-type/data-access' 
import { UserCreateInsuranceSectorInput } from '@case-clinical/api/insurance-sector/data-access' 
import { UserCreateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class UserCreateInsuranceInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  insuranceTypeId?: string

  @Field({ nullable: true }) 
  insuranceSectorId?: string

  @Field({ nullable: true }) 
  policyNumber?: string

  @Field({ nullable: true }) 
  insuranceCompany?: string

  @Field({ nullable: true }) 
  minimumCoverageAmount?: number

  @Field({ nullable: true }) 
  maximumCoverageAmount?: number

  @Field({ nullable: true }) 
  isStackable?: boolean

  @Field({ nullable: true }) 
  adjuster?: string

  @Field({ nullable: true }) 
  leadId?: string


  @Field(() => UserCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserCreateLegalCaseInput  


  @Field(() => UserCreateInsuranceTypeInput ,{ nullable: true }) 
  insuranceType?: UserCreateInsuranceTypeInput  


  @Field(() => UserCreateInsuranceSectorInput ,{ nullable: true }) 
  insuranceSector?: UserCreateInsuranceSectorInput  


  @Field(() => UserCreateLeadInput ,{ nullable: true }) 
  lead?: UserCreateLeadInput  

}
