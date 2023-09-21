import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@case-clinical/api/user/data-access'
import { Course } from '@case-clinical/api/academy/course/data-access'

@ObjectType()
export class UserCourseProgress {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

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

  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => Course, { nullable: true })
  course?: Course
}
