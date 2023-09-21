import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserChildFormUpdateInput {

  @Field({ nullable: true })
  formLayoutId: string

  @Field({ nullable: true })
  config: string

  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  order: number

  @Field({ nullable: true })
  testData?: string

  @Field({ nullable: true })
  modelData?: string
}
