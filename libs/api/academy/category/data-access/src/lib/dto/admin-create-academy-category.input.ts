import { Field, InputType } from '@nestjs/graphql'
import { AdminCreateCourseInput } from '@case-clinical/api/academy/course/data-access'

@InputType()
export class AdminCreateAcademyCategoryInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  slug?: string

  @Field({ nullable: true })
  title?: string

  @Field(() => [AdminCreateCourseInput], { nullable: true })
  courses?: AdminCreateCourseInput[]
}
