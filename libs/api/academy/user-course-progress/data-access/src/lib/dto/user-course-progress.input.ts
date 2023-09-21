import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCourseProgressInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  courseId?: string

  @Field({ nullable: true })
  currentStep?: number

  @Field({ nullable: true })
  completed?: number
}
