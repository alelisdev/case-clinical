import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 


@InputType()
export class UserCreateDocumentTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserCreateAssignedDocumentInput[]


}
