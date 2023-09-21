import { Field, InputType } from '@nestjs/graphql'
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access'

@InputType()
export class UserUpdateDto {
  @Field()
  id: string

  @Field(()=> UserCreateDocumentInput, {nullable: true})
  document: UserCreateDocumentInput

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  name?: string
}
