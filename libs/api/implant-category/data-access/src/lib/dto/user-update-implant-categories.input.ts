import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateImplantCategoryInput } from './user-update-implant-category.input'

@InputType()
export class UserUpdateImplantCategoriesInput {
  @Field(() => [UserUpdateImplantCategoryInput], {nullable: true }) 
  implantCategories: UserUpdateImplantCategoryInput[]
}
