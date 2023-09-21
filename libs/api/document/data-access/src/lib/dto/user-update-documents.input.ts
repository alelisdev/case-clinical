import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateDocumentInput } from './user-update-document.input'

@InputType()
export class UserUpdateDocumentsInput {
  @Field(() => [UserUpdateDocumentInput], {nullable: true }) 
  documents: UserUpdateDocumentInput[]
}
