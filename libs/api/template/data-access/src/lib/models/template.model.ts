import { Field, ObjectType } from '@nestjs/graphql'

import { Contract } from '@case-clinical/api/contract/data-access' 
import { AssignedDocument } from '@case-clinical/api/assigned-document/data-access' 


@ObjectType()
export class Template {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  attachment?: string

  @Field({ nullable: true }) 
  encoding?: string

  @Field({ nullable: true }) 
  signatureFileType?: string

  @Field(() => [Contract], { nullable: true }) 
  contracts?: Contract[]

  @Field(() => [AssignedDocument], { nullable: true }) 
  assignedDocuments?: AssignedDocument[]


}
