import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access'
import { UserUpdateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class UserUpdateUserCourseProgressInput {

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

  @Field(() => UserUpdateUserInput ,{ nullable: true })
  user?: UserUpdateUserInput

  @Field(() => UserUpdateCourseInput ,{ nullable: true })
  course?: UserUpdateCourseInput
}
