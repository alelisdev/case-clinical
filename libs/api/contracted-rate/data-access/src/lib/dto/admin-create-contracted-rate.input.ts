import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { AdminCreateContractedRateKindInput } from '@case-clinical/api/contracted-rate-kind/data-access' 
import { AdminCreateContractKindInput } from '@case-clinical/api/contract-kind/data-access' 
import { AdminCreateVisitKindInput } from '@case-clinical/api/visit-kind/data-access' 
import { AdminCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminCreateContractedRateInput {

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


  @Field(() => AdminCreateContractInput ,{ nullable: true }) 
  contract?: AdminCreateContractInput  


  @Field(() => AdminCreateContractedRateKindInput ,{ nullable: true }) 
  contractedRateKind?: AdminCreateContractedRateKindInput  


  @Field(() => AdminCreateContractKindInput ,{ nullable: true }) 
  contractKind?: AdminCreateContractKindInput  


  @Field(() => AdminCreateVisitKindInput ,{ nullable: true }) 
  visitKind?: AdminCreateVisitKindInput  


  @Field(() => AdminCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminCreateClinicalProviderInput  


  @Field(() => AdminCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminCreateSpecialtyInput  

}