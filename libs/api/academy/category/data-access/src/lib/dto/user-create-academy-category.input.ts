import { Field, InputType } from '@nestjs/graphql'
import { UserCreateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class UserCreateAcademyCategoryInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  slug?: string

  @Field({ nullable: true })
  title?: string

  @Field(() => [UserCreateCourseInput], { nullable: true })
  courses?: UserCreateCourseInput[]
}
