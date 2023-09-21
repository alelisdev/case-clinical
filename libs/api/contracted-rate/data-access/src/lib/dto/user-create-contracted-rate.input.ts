import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserCreateContractedRateKindInput } from '@case-clinical/api/contracted-rate-kind/data-access' 
import { UserCreateContractKindInput } from '@case-clinical/api/contract-kind/data-access' 
import { UserCreateVisitKindInput } from '@case-clinical/api/visit-kind/data-access' 
import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class UserCreateContractedRateInput {

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


  @Field(() => UserCreateContractInput ,{ nullable: true }) 
  contract?: UserCreateContractInput  


  @Field(() => UserCreateContractedRateKindInput ,{ nullable: true }) 
  contractedRateKind?: UserCreateContractedRateKindInput  


  @Field(() => UserCreateContractKindInput ,{ nullable: true }) 
  contractKind?: UserCreateContractKindInput  


  @Field(() => UserCreateVisitKindInput ,{ nullable: true }) 
  visitKind?: UserCreateVisitKindInput  


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: UserCreateSpecialtyInput  

}
