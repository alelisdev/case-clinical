import { Field, ObjectType } from '@nestjs/graphql'

import { CaseAccount } from '@case-clinical/api/case-account/data-access'

import { WriteOffStatus } from '@case-clinical/api/write-off-status/data-access'


@ObjectType()
export class WriteOff {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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


  @Field(() => CaseAccount, { nullable: true }) 
  account?: CaseAccount  

  @Field(() => WriteOffStatus, { nullable: true }) 
  writeOffStatus?: WriteOffStatus  

}
