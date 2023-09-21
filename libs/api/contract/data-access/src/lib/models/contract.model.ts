import { Field, ObjectType } from '@nestjs/graphql'

import { Organization } from '@case-clinical/api/organization/data-access'

import { Template } from '@case-clinical/api/template/data-access'

import { Vendor } from '@case-clinical/api/vendor/data-access'

import { ReconciliationPeriodType } from '@case-clinical/api/reconciliation-period-type/data-access'

import { CalculationBasisType } from '@case-clinical/api/calculation-basis-type/data-access'

import { Process } from '@case-clinical/api/process/data-access'
import { Document } from '@case-clinical/api/document/data-access' 
import { ContractedRate } from '@case-clinical/api/contracted-rate/data-access' 
import { CaseAccount } from '@case-clinical/api/case-account/data-access' 
import { ContractTerm } from '@case-clinical/api/contract-term/data-access' 
import { ProcedureVendor } from '@case-clinical/api/procedure-vendor/data-access' 


@ObjectType()
export class Contract {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  organizationId?: string

  @Field({ nullable: true }) 
  billingOrganizationId?: string

  @Field({ nullable: true }) 
  templateId?: string

  @Field({ nullable: true }) 
  billOnBehalf?: boolean

  @Field({ nullable: true }) 
  billRate?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  contractDate?: Date

  @Field({ nullable: true }) 
  maturityDate?: Date

  @Field({ nullable: true }) 
  requiresTpaMedicalNecessity?: boolean

  @Field({ nullable: true }) 
  requiresTpaMedicareAllowable?: boolean

  @Field({ nullable: true }) 
  reconciliationPeriodTypeId?: string

  @Field({ nullable: true }) 
  calculationBasisTypeId?: string

  @Field({ nullable: true }) 
  signed?: boolean

  @Field({ nullable: true }) 
  processId?: string

  @Field(() => [Document], { nullable: true }) 
  documents?: Document[]

  @Field(() => [ContractedRate], { nullable: true }) 
  contractedRates?: ContractedRate[]

  @Field(() => [CaseAccount], { nullable: true }) 
  caseAccounts?: CaseAccount[]

  @Field(() => [ContractTerm], { nullable: true }) 
  contractTerms?: ContractTerm[]

  @Field(() => [ProcedureVendor], { nullable: true }) 
  procedureVendors?: ProcedureVendor[]


  @Field(() => Organization, { nullable: true }) 
  organization?: Organization  

  @Field(() => Organization, { nullable: true }) 
  billingOrganization?: Organization  

  @Field(() => Template, { nullable: true }) 
  template?: Template  

  @Field(() => Vendor, { nullable: true }) 
  vendor?: Vendor  

  @Field(() => ReconciliationPeriodType, { nullable: true }) 
  reconciliationPeriodType?: ReconciliationPeriodType  

  @Field(() => CalculationBasisType, { nullable: true }) 
  calculationBasisType?: CalculationBasisType  

  @Field(() => Process, { nullable: true }) 
  process?: Process  

}
