import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCostCategoryInput } from './user-update-cost-category.input'

@InputType()
export class UserUpdateCostCategoriesInput {
  @Field(() => [UserUpdateCostCategoryInput], {nullable: true }) 
  costCategories: UserUpdateCostCategoryInput[]
}
