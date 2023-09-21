import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminUpdateInsuranceTypeInput } from '@case-clinical/api/insurance-type/data-access' 
import { AdminUpdateInsuranceSectorInput } from '@case-clinical/api/insurance-sector/data-access' 
import { AdminUpdateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class AdminUpdateInsuranceInput {

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


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminUpdateLegalCaseInput  


  @Field(() => AdminUpdateInsuranceTypeInput ,{ nullable: true }) 
  insuranceType?: AdminUpdateInsuranceTypeInput  


  @Field(() => AdminUpdateInsuranceSectorInput ,{ nullable: true }) 
  insuranceSector?: AdminUpdateInsuranceSectorInput  


  @Field(() => AdminUpdateLeadInput ,{ nullable: true }) 
  lead?: AdminUpdateLeadInput  

}