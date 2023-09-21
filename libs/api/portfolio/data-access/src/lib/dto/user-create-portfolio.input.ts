import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class UserCreatePortfolioInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserCreateCaseAccountInput[]


}
