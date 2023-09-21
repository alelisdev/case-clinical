import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAssignedDocumentInput } from './user-update-assigned-document.input'

@InputType()
export class UserUpdateAssignedDocumentsInput {
  @Field(() => [UserUpdateAssignedDocumentInput], {nullable: true }) 
  assignedDocuments: UserUpdateAssignedDocumentInput[]
}
