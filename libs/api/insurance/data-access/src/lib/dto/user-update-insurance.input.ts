import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { UserUpdateInsuranceTypeInput } from '@case-clinical/api/insurance-type/data-access' 
import { UserUpdateInsuranceSectorInput } from '@case-clinical/api/insurance-sector/data-access' 
import { UserUpdateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class UserUpdateInsuranceInput {

  @Field({ nullable: true }) 
  id?: string

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


  @Field(() => UserUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: UserUpdateLegalCaseInput  


  @Field(() => UserUpdateInsuranceTypeInput ,{ nullable: true }) 
  insuranceType?: UserUpdateInsuranceTypeInput  


  @Field(() => UserUpdateInsuranceSectorInput ,{ nullable: true }) 
  insuranceSector?: UserUpdateInsuranceSectorInput  


  @Field(() => UserUpdateLeadInput ,{ nullable: true }) 
  lead?: UserUpdateLeadInput  

}