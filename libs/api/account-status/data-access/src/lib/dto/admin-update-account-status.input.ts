import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class AdminUpdateAccountStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserUpdateCaseAccountInput[]


}