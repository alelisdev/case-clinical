import { Field, ObjectType } from '@nestjs/graphql'

import { Contract } from '@case-clinical/api/contract/data-access'

import { ContractedRateKind } from '@case-clinical/api/contracted-rate-kind/data-access'

import { ContractKind } from '@case-clinical/api/contract-kind/data-access'

import { VisitKind } from '@case-clinical/api/visit-kind/data-access'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { Specialty } from '@case-clinical/api/specialty/data-access'


@ObjectType()
export class ContractedRate {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => Contract, { nullable: true }) 
  contract?: Contract  

  @Field(() => ContractedRateKind, { nullable: true }) 
  contractedRateKind?: ContractedRateKind  

  @Field(() => ContractKind, { nullable: true }) 
  contractKind?: ContractKind  

  @Field(() => VisitKind, { nullable: true }) 
  visitKind?: VisitKind  

  @Field(() => ClinicalProvider, { nullable: true }) 
  clinicalProvider?: ClinicalProvider  

  @Field(() => Specialty, { nullable: true }) 
  specialty?: Specialty  

}
