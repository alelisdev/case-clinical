import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateOrganizationInput } from '@case-clinical/api/organization/data-access' 
import { AdminCreateTemplateInput } from '@case-clinical/api/template/data-access' 
import { AdminCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { AdminCreateReconciliationPeriodTypeInput } from '@case-clinical/api/reconciliation-period-type/data-access' 
import { AdminCreateCalculationBasisTypeInput } from '@case-clinical/api/calculation-basis-type/data-access' 
import { AdminCreateProcessInput } from '@case-clinical/api/process/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 
import { AdminCreateContractedRateInput } from '@case-clinical/api/contracted-rate/data-access' 
import { AdminCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { AdminCreateContractTermInput } from '@case-clinical/api/contract-term/data-access' 
import { AdminCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 


@InputType()
export class AdminCreateContractInput {

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

  @Field(() => [AdminCreateDocumentInput], { nullable: true }) 
  documents?: AdminCreateDocumentInput[]

  @Field(() => [AdminCreateContractedRateInput], { nullable: true }) 
  contractedRates?: AdminCreateContractedRateInput[]

  @Field(() => [AdminCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: AdminCreateCaseAccountInput[]

  @Field(() => [AdminCreateContractTermInput], { nullable: true }) 
  contractTerms?: AdminCreateContractTermInput[]

  @Field(() => [AdminCreateProcedureVendorInput], { nullable: true }) 
  procedureVendors?: AdminCreateProcedureVendorInput[]


  @Field(() => AdminCreateOrganizationInput ,{ nullable: true }) 
  organization?: AdminCreateOrganizationInput  


  @Field(() => AdminCreateOrganizationInput ,{ nullable: true }) 
  billingOrganization?: AdminCreateOrganizationInput  


  @Field(() => AdminCreateTemplateInput ,{ nullable: true }) 
  template?: AdminCreateTemplateInput  


  @Field(() => AdminCreateVendorInput ,{ nullable: true }) 
  vendor?: AdminCreateVendorInput  


  @Field(() => AdminCreateReconciliationPeriodTypeInput ,{ nullable: true }) 
  reconciliationPeriodType?: AdminCreateReconciliationPeriodTypeInput  


  @Field(() => AdminCreateCalculationBasisTypeInput ,{ nullable: true }) 
  calculationBasisType?: AdminCreateCalculationBasisTypeInput  


  @Field(() => AdminCreateProcessInput ,{ nullable: true }) 
  process?: AdminCreateProcessInput  

}