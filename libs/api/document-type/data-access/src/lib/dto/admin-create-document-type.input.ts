import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 


@InputType()
export class AdminCreateDocumentTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: AdminCreateAssignedDocumentInput[]


}