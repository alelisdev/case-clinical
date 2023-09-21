import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateNavigationInput } from './user-update-navigation.input'

@InputType()
export class UserUpdateNavigationsInput {
  @Field(() => [UserUpdateNavigationInput], {nullable: true }) 
  navigations: UserUpdateNavigationInput[]
}
