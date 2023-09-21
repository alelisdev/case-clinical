import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserFormLayoutCreateInput {

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  config: string

  @Field({ nullable: true })
  previewImage?: string

  @Field({ nullable: true })
  testData?: string
}
