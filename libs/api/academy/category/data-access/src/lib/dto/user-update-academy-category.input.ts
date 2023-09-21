import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class UserUpdateAcademyCategoryInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  slug?: string

  @Field({ nullable: true })
  title?: string

  @Field(() => [UserUpdateCourseInput], { nullable: true })
  courses?: UserUpdateCourseInput[]
}
