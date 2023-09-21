import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminCreateInsuranceTypeInput } from '@case-clinical/api/insurance-type/data-access' 
import { AdminCreateInsuranceSectorInput } from '@case-clinical/api/insurance-sector/data-access' 
import { AdminCreateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class AdminCreateInsuranceInput {

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


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminCreateLegalCaseInput  


  @Field(() => AdminCreateInsuranceTypeInput ,{ nullable: true }) 
  insuranceType?: AdminCreateInsuranceTypeInput  


  @Field(() => AdminCreateInsuranceSectorInput ,{ nullable: true }) 
  insuranceSector?: AdminCreateInsuranceSectorInput  


  @Field(() => AdminCreateLeadInput ,{ nullable: true }) 
  lead?: AdminCreateLeadInput  

}