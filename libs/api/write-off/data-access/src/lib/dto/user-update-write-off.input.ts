import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserUpdateWriteOffStatusInput } from '@case-clinical/api/write-off-status/data-access' 


@InputType()
export class UserUpdateWriteOffInput {

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


  @Field(() => UserUpdateCaseAccountInput ,{ nullable: true }) 
  account?: UserUpdateCaseAccountInput  


  @Field(() => UserUpdateWriteOffStatusInput ,{ nullable: true }) 
  writeOffStatus?: UserUpdateWriteOffStatusInput  

}