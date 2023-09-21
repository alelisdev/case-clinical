import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateDocumentTypeInput } from './user-update-document-type.input'

@InputType()
export class UserUpdateDocumentTypesInput {
  @Field(() => [UserUpdateDocumentTypeInput], {nullable: true }) 
  documentTypes: UserUpdateDocumentTypeInput[]
}
