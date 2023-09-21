import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class UserCreateAgreementTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserCreateCaseAccountInput[]


}
