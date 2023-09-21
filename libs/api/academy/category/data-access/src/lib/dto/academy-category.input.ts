import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AcademyCategoryInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  slug?: string

  @Field({ nullable: true })
  title?: string
}
