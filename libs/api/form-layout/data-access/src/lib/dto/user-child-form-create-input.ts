import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserChildFormCreateInput {

  @Field({ nullable: true })
  parentId: string

  @Field({ nullable: true })
  parentName: string

  @Field({ nullable: true })
  config: string

  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  order: number

}
