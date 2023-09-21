import { Field, ObjectType } from '@nestjs/graphql'

import { CaseProcedure } from '@case-clinical/api/case-procedure/data-access'

import { Contract } from '@case-clinical/api/contract/data-access'

import { Vendor } from '@case-clinical/api/vendor/data-access'

import { ProcedureVendorStatus } from '@case-clinical/api/procedure-vendor-status/data-access'
import { CaseAccount } from '@case-clinical/api/case-account/data-access' 
import { Document } from '@case-clinical/api/document/data-access' 


@ObjectType()
export class ProcedureVendor {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [CaseAccount], { nullable: true }) 
  caseAccounts?: CaseAccount[]

  @Field(() => [Document], { nullable: true }) 
  documents?: Document[]


  @Field(() => CaseProcedure, { nullable: true }) 
  procedure?: CaseProcedure  

  @Field(() => Contract, { nullable: true }) 
  contract?: Contract  

  @Field(() => Vendor, { nullable: true }) 
  vendor?: Vendor  

  @Field(() => ProcedureVendorStatus, { nullable: true }) 
  status?: ProcedureVendorStatus  

}
