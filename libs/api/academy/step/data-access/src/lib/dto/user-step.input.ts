import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserStepInput {

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  subtitle?: string

  @Field({ nullable: true })
  courseId?: string
}
