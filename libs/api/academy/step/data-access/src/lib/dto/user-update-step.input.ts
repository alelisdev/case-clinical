import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access'
import { UserUpdateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class UserUpdateStepInput {

  @Field({ nullable: true })
  order?: number

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  subtitle?: string

  @Field({ nullable: true })
  content?: string

  @Field({ nullable: true })
  courseId?: string
}
