import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class UserCreateProcedureTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  orderIndex?: string

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  isSystem?: boolean

  @Field({ nullable: true }) 
  removed?: boolean

  @Field({ nullable: true }) 
  modality?: string

  @Field(() => [UserCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserCreateCaseAccountInput[]


}
