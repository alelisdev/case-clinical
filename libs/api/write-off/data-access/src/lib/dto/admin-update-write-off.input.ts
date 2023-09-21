import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { AdminUpdateWriteOffStatusInput } from '@case-clinical/api/write-off-status/data-access' 


@InputType()
export class AdminUpdateWriteOffInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  accountId?: string

  @Field({ nullable: true }) 
  writeOffStatusId?: string

  @Field({ nullable: true }) 
  amount?: number

  @Field({ nullable: true }) 
  createdBy?: string

  @Field({ nullable: true }) 
  dateCreated?: Date


  @Field(() => AdminUpdateCaseAccountInput ,{ nullable: true }) 
  account?: AdminUpdateCaseAccountInput  


  @Field(() => AdminUpdateWriteOffStatusInput ,{ nullable: true }) 
  writeOffStatus?: AdminUpdateWriteOffStatusInput  

}