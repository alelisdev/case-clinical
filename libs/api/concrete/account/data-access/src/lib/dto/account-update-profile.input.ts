import { Field, InputType } from '@nestjs/graphql'
import { UserCreateDocumentInput } from '@case-clinical/api/document/data-access'

@InputType()
export class AccountUpdateProfileInput {
  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  bio?: string

  @Field({ nullable: true })
  location?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  dateOfBirth?: Date

  @Field({ nullable: true })
  line1?: string

  @Field({ nullable: true })
  line2?: string

  @Field({ nullable: true })
  city?: string

  @Field({ nullable: true })
  state?: string

  @Field({ nullable: true })
  postalCode?: string


  @Field(() => UserCreateDocumentInput ,{ nullable: true })
  document?: UserCreateDocumentInput
}
