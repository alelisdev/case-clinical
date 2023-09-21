import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Step {

  @Field({ nullable: false })
  id: string

  @Field({ nullable: false })
  order: number

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  subtitle?: string

  @Field({ nullable: true })
  content?: string

  @Field({ nullable: true })
  courseId?: string

}
