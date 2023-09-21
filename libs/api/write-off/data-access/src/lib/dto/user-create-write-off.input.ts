import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { UserCreateWriteOffStatusInput } from '@case-clinical/api/write-off-status/data-access' 


@InputType()
export class UserCreateWriteOffInput {

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


  @Field(() => UserCreateCaseAccountInput ,{ nullable: true }) 
  account?: UserCreateCaseAccountInput  


  @Field(() => UserCreateWriteOffStatusInput ,{ nullable: true }) 
  writeOffStatus?: UserCreateWriteOffStatusInput  

}
