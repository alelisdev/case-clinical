import { Field, ObjectType } from '@nestjs/graphql'

import { LegalCase } from '@case-clinical/api/legal-case/data-access'

import { InsuranceType } from '@case-clinical/api/insurance-type/data-access'

import { InsuranceSector } from '@case-clinical/api/insurance-sector/data-access'

import { Lead } from '@case-clinical/api/lead/data-access'


@ObjectType()
export class Insurance {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => LegalCase, { nullable: true }) 
  legalCase?: LegalCase  

  @Field(() => InsuranceType, { nullable: true }) 
  insuranceType?: InsuranceType  

  @Field(() => InsuranceSector, { nullable: true }) 
  insuranceSector?: InsuranceSector  

  @Field(() => Lead, { nullable: true }) 
  lead?: Lead  

}
