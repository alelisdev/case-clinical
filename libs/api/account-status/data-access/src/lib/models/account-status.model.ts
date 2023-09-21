import { Field, ObjectType } from '@nestjs/graphql'

import { CaseAccount } from '@case-clinical/api/case-account/data-access' 


@ObjectType()
export class AccountStatus {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [CaseAccount], { nullable: true }) 
  caseAccounts?: CaseAccount[]


}
