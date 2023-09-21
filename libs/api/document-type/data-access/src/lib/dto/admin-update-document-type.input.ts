import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 


@InputType()
export class AdminUpdateDocumentTypeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserUpdateAssignedDocumentInput[]


}