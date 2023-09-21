import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateOrganizationInput } from '@case-clinical/api/organization/data-access' 
import { UserUpdateTemplateInput } from '@case-clinical/api/template/data-access' 
import { UserUpdateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { UserUpdateReconciliationPeriodTypeInput } from '@case-clinical/api/reconciliation-period-type/data-access' 
import { UserUpdateCalculationBasisTypeInput } from '@case-clinical/api/calculation-basis-type/data-access' 
import { UserUpdateProcessInput } from '@case-clinical/api/process/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserUpdateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 
import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserUpdateContractTermInput } from '@case-clinical/api/contract-term/data-access' 
import { UserUpdateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 


@InputType()
export class UserUpdateContractInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateDocumentInput], { nullable: true }) 
  documents?: UserUpdateDocumentInput[]

  @Field(() => [UserUpdateContractedRateInput], { nullable: true }) 
  contractedRates?: UserUpdateContractedRateInput[]

  @Field(() => [UserUpdateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserUpdateCaseAccountInput[]

  @Field(() => [UserUpdateContractTermInput], { nullable: true }) 
  contractTerms?: UserUpdateContractTermInput[]

  @Field(() => [UserUpdateProcedureVendorInput], { nullable: true }) 
  procedureVendors?: UserUpdateProcedureVendorInput[]


  @Field(() => UserUpdateOrganizationInput ,{ nullable: true }) 
  organization?: UserUpdateOrganizationInput  


  @Field(() => UserUpdateOrganizationInput ,{ nullable: true }) 
  billingOrganization?: UserUpdateOrganizationInput  


  @Field(() => UserUpdateTemplateInput ,{ nullable: true }) 
  template?: UserUpdateTemplateInput  


  @Field(() => UserUpdateVendorInput ,{ nullable: true }) 
  vendor?: UserUpdateVendorInput  


  @Field(() => UserUpdateReconciliationPeriodTypeInput ,{ nullable: true }) 
  reconciliationPeriodType?: UserUpdateReconciliationPeriodTypeInput  


  @Field(() => UserUpdateCalculationBasisTypeInput ,{ nullable: true }) 
  calculationBasisType?: UserUpdateCalculationBasisTypeInput  


  @Field(() => UserUpdateProcessInput ,{ nullable: true }) 
  process?: UserUpdateProcessInput  

}