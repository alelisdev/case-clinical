import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAuthorizationCategoryInput } from './user-update-authorization-category.input'

@InputType()
export class UserUpdateAuthorizationCategoriesInput {
  @Field(() => [UserUpdateAuthorizationCategoryInput], {nullable: true }) 
  authorizationCategories: UserUpdateAuthorizationCategoryInput[]
}
