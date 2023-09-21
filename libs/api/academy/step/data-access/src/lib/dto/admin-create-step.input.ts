import { Field, InputType } from '@nestjs/graphql'
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access'
import { AdminCreateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class AdminCreateStepInput {

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
