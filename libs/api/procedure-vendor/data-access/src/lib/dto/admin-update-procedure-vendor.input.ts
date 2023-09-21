import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { AdminUpdateContractInput } from '@case-clinical/api/contract/data-access' 
import { AdminUpdateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { AdminUpdateProcedureVendorStatusInput } from '@case-clinical/api/procedure-vendor-status/data-access' 
import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class AdminUpdateProcedureVendorInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserUpdateCaseAccountInput[]

  @Field(() => [UserUpdateDocumentInput], { nullable: true }) 
  documents?: UserUpdateDocumentInput[]


  @Field(() => AdminUpdateCaseProcedureInput ,{ nullable: true }) 
  procedure?: AdminUpdateCaseProcedureInput  


  @Field(() => AdminUpdateContractInput ,{ nullable: true }) 
  contract?: AdminUpdateContractInput  


  @Field(() => AdminUpdateVendorInput ,{ nullable: true }) 
  vendor?: AdminUpdateVendorInput  


  @Field(() => AdminUpdateProcedureVendorStatusInput ,{ nullable: true }) 
  status?: AdminUpdateProcedureVendorStatusInput  

}