import { Field, InputType } from '@nestjs/graphql'

import { UserCreateOrganizationInput } from '@case-clinical/api/organization/data-access' 
import { UserCreateTemplateInput } from '@case-clinical/api/template/data-access' 
import { UserCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { UserCreateReconciliationPeriodTypeInput } from '@case-clinical/api/reconciliation-period-type/data-access' 
import { UserCreateCalculationBasisTypeInput } from '@case-clinical/api/calculation-basis-type/data-access' 
import { UserCreateProcessInput } from '@case-clinical/api/process/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { UserCreateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 
import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserCreateContractTermInput } from '@case-clinical/api/contract-term/data-access' 
import { UserCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 


@InputType()
export class UserCreateContractInput {

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

  @Field(() => [UserCreateDocumentInput], { nullable: true }) 
  documents?: UserCreateDocumentInput[]

  @Field(() => [UserCreateContractedRateInput], { nullable: true }) 
  contractedRates?: UserCreateContractedRateInput[]

  @Field(() => [UserCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserCreateCaseAccountInput[]

  @Field(() => [UserCreateContractTermInput], { nullable: true }) 
  contractTerms?: UserCreateContractTermInput[]

  @Field(() => [UserCreateProcedureVendorInput], { nullable: true }) 
  procedureVendors?: UserCreateProcedureVendorInput[]


  @Field(() => UserCreateOrganizationInput ,{ nullable: true }) 
  organization?: UserCreateOrganizationInput  


  @Field(() => UserCreateOrganizationInput ,{ nullable: true }) 
  billingOrganization?: UserCreateOrganizationInput  


  @Field(() => UserCreateTemplateInput ,{ nullable: true }) 
  template?: UserCreateTemplateInput  


  @Field(() => UserCreateVendorInput ,{ nullable: true }) 
  vendor?: UserCreateVendorInput  


  @Field(() => UserCreateReconciliationPeriodTypeInput ,{ nullable: true }) 
  reconciliationPeriodType?: UserCreateReconciliationPeriodTypeInput  


  @Field(() => UserCreateCalculationBasisTypeInput ,{ nullable: true }) 
  calculationBasisType?: UserCreateCalculationBasisTypeInput  


  @Field(() => UserCreateProcessInput ,{ nullable: true }) 
  process?: UserCreateProcessInput  

}
