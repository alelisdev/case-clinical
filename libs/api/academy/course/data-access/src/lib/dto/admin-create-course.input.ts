import { Field, InputType } from '@nestjs/graphql'
import { AdminCreateAcademyCategoryInput } from '@case-clinical/api/academy/category/data-access'

@InputType()
export class AdminCreateCourseInput {

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


  @Field(() => AdminCreateAcademyCategoryInput ,{ nullable: true })
  category?: AdminCreateAcademyCategoryInput

}
