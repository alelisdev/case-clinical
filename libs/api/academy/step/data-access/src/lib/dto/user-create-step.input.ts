import { Field, InputType } from '@nestjs/graphql'
import { UserCreateUserInput } from '@case-clinical/api/user/data-access'
import { UserCreateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class UserCreateStepInput {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  subtitle?: string

  @Field({ nullable: true })
  content?: string

  @Field({ nullable: true })
  courseId?: string
}
