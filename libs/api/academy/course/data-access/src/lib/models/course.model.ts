import { Progress } from './progress.model';
import { Field, ObjectType } from '@nestjs/graphql'
import { AcademyCategory } from '@case-clinical/api/academy/category/data-access'
import { UserCourseProgress } from '@case-clinical/api/academy/user-course-progress/data-access'
import { Step } from '@case-clinical/api/academy/step/data-access';

@ObjectType()
export class Course {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  slug?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  duration?: number

  @Field({ nullable: true })
  totalSteps?: number

  @Field({ nullable: true })
  featured?: boolean

  @Field({ nullable: true })
  content?: string

  @Field({ nullable: true })
  categoryId?: string

  @Field(() => AcademyCategory, { nullable: true })
  category?: AcademyCategory

  @Field(() => [UserCourseProgress], { nullable: true })
  courseProgresses?: UserCourseProgress[]

  @Field(() => [Step], { nullable: true })
  steps?: Step[]

  @Field(() => Progress, { nullable: true })
  progress?: Progress
}
