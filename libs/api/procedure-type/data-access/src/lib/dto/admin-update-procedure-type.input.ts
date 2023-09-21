import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 


@InputType()
export class AdminUpdateProcedureTypeInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdateCaseAccountInput], { nullable: true }) 
  caseAccounts?: UserUpdateCaseAccountInput[]


}