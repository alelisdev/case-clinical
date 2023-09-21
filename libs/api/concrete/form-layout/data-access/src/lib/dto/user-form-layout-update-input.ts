import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserFormLayoutUpdateInput {

  @Field({ nullable: true })
  config?: string

  @Field({ nullable: true })
  previewImage?: string

  @Field({ nullable: true })
  testData?: string
}
