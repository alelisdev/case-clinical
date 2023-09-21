import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { AdminCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { AdminCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { AdminCreateProcedureVendorStatusInput } from '@case-clinical/api/procedure-vendor-status/data-access' 
import { AdminCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { AdminCreateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class AdminCreateProcedureVendorInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  procedureId?: string

  @Field({ nullable: true }) 
  contractId?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  statusId?: string

  @Field({ nullable: true }) 
  estimate?: number

  @Field({ nullable: true }) 
  fundingApproved?: boolean

  @Field(() => [AdminCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: AdminCreateCaseAccountInput[]

  @Field(() => [AdminCreateDocumentInput], { nullable: true }) 
  documents?: AdminCreateDocumentInput[]


  @Field(() => AdminCreateCaseProcedureInput ,{ nullable: true }) 
  procedure?: AdminCreateCaseProcedureInput  


  @Field(() => AdminCreateContractInput ,{ nullable: true }) 
  contract?: AdminCreateContractInput  


  @Field(() => AdminCreateVendorInput ,{ nullable: true }) 
  vendor?: AdminCreateVendorInput  


  @Field(() => AdminCreateProcedureVendorStatusInput ,{ nullable: true }) 
  status?: AdminCreateProcedureVendorStatusInput  

}