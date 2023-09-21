import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateSpecialtyInput } from './user-update-specialty.input'

@InputType()
export class UserUpdateSpecialtiesInput {
  @Field(() => [UserUpdateSpecialtyInput], {nullable: true }) 
  specialties: UserUpdateSpecialtyInput[]
}
