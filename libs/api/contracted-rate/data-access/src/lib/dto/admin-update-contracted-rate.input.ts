import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateContractInput } from '@case-clinical/api/contract/data-access' 
import { AdminUpdateContractedRateKindInput } from '@case-clinical/api/contracted-rate-kind/data-access' 
import { AdminUpdateContractKindInput } from '@case-clinical/api/contract-kind/data-access' 
import { AdminUpdateVisitKindInput } from '@case-clinical/api/visit-kind/data-access' 
import { AdminUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { AdminUpdateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class AdminUpdateContractedRateInput {

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


  @Field(() => AdminUpdateContractInput ,{ nullable: true }) 
  contract?: AdminUpdateContractInput  


  @Field(() => AdminUpdateContractedRateKindInput ,{ nullable: true }) 
  contractedRateKind?: AdminUpdateContractedRateKindInput  


  @Field(() => AdminUpdateContractKindInput ,{ nullable: true }) 
  contractKind?: AdminUpdateContractKindInput  


  @Field(() => AdminUpdateVisitKindInput ,{ nullable: true }) 
  visitKind?: AdminUpdateVisitKindInput  


  @Field(() => AdminUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: AdminUpdateClinicalProviderInput  


  @Field(() => AdminUpdateSpecialtyInput ,{ nullable: true }) 
  specialty?: AdminUpdateSpecialtyInput  

}