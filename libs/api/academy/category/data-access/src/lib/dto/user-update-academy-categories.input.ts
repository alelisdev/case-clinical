import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAcademyCategoryInput } from './user-update-academy-category.input'

@InputType()
export class UserUpdateAcademyCategoriesInput {
  @Field(() => [UserUpdateAcademyCategoryInput], {nullable: true }) 
  academyCategories: UserUpdateAcademyCategoryInput[]
}
