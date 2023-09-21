import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { UserCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { UserCreateProcedureVendorStatusInput } from '@case-clinical/api/procedure-vendor-status/data-access' 
import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access' 


@InputType()
export class UserCreateProcedureVendorInput {

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

  @Field(() => [UserCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserCreateCaseAccountInput[]

  @Field(() => [UserCreateDocumentInput], { nullable: true }) 
  documents?: UserCreateDocumentInput[]


  @Field(() => UserCreateCaseProcedureInput ,{ nullable: true }) 
  procedure?: UserCreateCaseProcedureInput  


  @Field(() => UserCreateContractInput ,{ nullable: true }) 
  contract?: UserCreateContractInput  


  @Field(() => UserCreateVendorInput ,{ nullable: true }) 
  vendor?: UserCreateVendorInput  


  @Field(() => UserCreateProcedureVendorStatusInput ,{ nullable: true }) 
  status?: UserCreateProcedureVendorStatusInput  

}
