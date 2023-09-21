import { Field, InputType } from '@nestjs/graphql'
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access'
import { AdminUpdateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class AdminUpdateUserCourseProgressInput {

  @Field({ nullable: true })
  id?: string

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

  @Field(() => AdminUpdateUserInput ,{ nullable: true })
  user?: AdminUpdateUserInput

  @Field(() => AdminUpdateCourseInput ,{ nullable: true })
  course?: AdminUpdateCourseInput
}
