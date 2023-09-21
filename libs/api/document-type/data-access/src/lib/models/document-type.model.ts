import { Field, ObjectType } from '@nestjs/graphql'

import { AssignedDocument } from '@case-clinical/api/assigned-document/data-access' 


@ObjectType()
export class DocumentType {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AssignedDocument], { nullable: true }) 
  assignedDocuments?: AssignedDocument[]


}
