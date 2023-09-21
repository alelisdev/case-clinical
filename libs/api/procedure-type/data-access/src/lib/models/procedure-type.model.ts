import { Field, ObjectType } from '@nestjs/graphql'

import { CaseAccount } from '@case-clinical/api/case-account/data-access' 


@ObjectType()
export class ProcedureType {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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

  @Field(() => [CaseAccount], { nullable: true }) 
  caseAccounts?: CaseAccount[]


}
