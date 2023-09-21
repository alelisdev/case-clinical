import { Field, InputType } from '@nestjs/graphql'
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access'
import { AdminUpdateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class AdminUpdateStepInput {
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
