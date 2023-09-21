import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { UserUpdateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserUpdateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { UserUpdateProcedureVendorStatusInput } from '@case-clinical/api/procedure-vendor-status/data-access' 
import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class UserUpdateProcedureVendorInput {

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


  @Field(() => UserUpdateCaseProcedureInput ,{ nullable: true }) 
  procedure?: UserUpdateCaseProcedureInput  


  @Field(() => UserUpdateContractInput ,{ nullable: true }) 
  contract?: UserUpdateContractInput  


  @Field(() => UserUpdateVendorInput ,{ nullable: true }) 
  vendor?: UserUpdateVendorInput  


  @Field(() => UserUpdateProcedureVendorStatusInput ,{ nullable: true }) 
  status?: UserUpdateProcedureVendorStatusInput  

}