import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { AdminCreateWriteOffStatusInput } from '@case-clinical/api/write-off-status/data-access' 


@InputType()
export class AdminCreateWriteOffInput {

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


  @Field(() => AdminCreateCaseAccountInput ,{ nullable: true }) 
  account?: AdminCreateCaseAccountInput  


  @Field(() => AdminCreateWriteOffStatusInput ,{ nullable: true }) 
  writeOffStatus?: AdminCreateWriteOffStatusInput  

}