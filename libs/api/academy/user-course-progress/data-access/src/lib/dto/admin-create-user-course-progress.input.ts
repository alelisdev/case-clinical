import { Field, InputType } from '@nestjs/graphql'
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access'
import { AdminCreateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class AdminCreateUserCourseProgressInput {

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

  @Field(() => AdminCreateUserInput ,{ nullable: true })
  user?: AdminCreateUserInput

  @Field(() => AdminCreateCourseInput ,{ nullable: true })
  course?: AdminCreateCourseInput
}
