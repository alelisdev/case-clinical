import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCategoryInput } from './user-update-category.input'

@InputType()
export class UserUpdateCategoriesInput {
  @Field(() => [UserUpdateCategoryInput], {nullable: true }) 
  categories: UserUpdateCategoryInput[]
}
