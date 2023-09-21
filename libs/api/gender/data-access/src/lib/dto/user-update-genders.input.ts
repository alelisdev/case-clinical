import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateGenderInput } from './user-update-gender.input'

@InputType()
export class UserUpdateGendersInput {
  @Field(() => [UserUpdateGenderInput], {nullable: true }) 
  genders: UserUpdateGenderInput[]
}
