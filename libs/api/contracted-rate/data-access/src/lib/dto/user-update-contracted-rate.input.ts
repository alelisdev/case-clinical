import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserUpdateContractedRateKindInput } from '@case-clinical/api/contracted-rate-kind/data-access' 
import { UserUpdateContractKindInput } from '@case-clinical/api/contract-kind/data-access' 
import { UserUpdateVisitKindInput } from '@case-clinical/api/visit-kind/data-access' 
import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserUpdateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class UserUpdateContractedRateInput {

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


  @Field(() => UserUpdateContractInput ,{ nullable: true }) 
  contract?: UserUpdateContractInput  


  @Field(() => UserUpdateContractedRateKindInput ,{ nullable: true }) 
  contractedRateKind?: UserUpdateContractedRateKindInput  


  @Field(() => UserUpdateContractKindInput ,{ nullable: true }) 
  contractKind?: UserUpdateContractKindInput  


  @Field(() => UserUpdateVisitKindInput ,{ nullable: true }) 
  visitKind?: UserUpdateVisitKindInput  


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserUpdateClinicalProviderInput  


  @Field(() => UserUpdateSpecialtyInput ,{ nullable: true }) 
  specialty?: UserUpdateSpecialtyInput  

}