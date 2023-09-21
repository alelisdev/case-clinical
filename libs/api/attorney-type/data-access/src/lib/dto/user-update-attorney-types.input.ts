import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAttorneyTypeInput } from './user-update-attorney-type.input'

@InputType()
export class UserUpdateAttorneyTypesInput {
  @Field(() => [UserUpdateAttorneyTypeInput], {nullable: true }) 
  attorneyTypes: UserUpdateAttorneyTypeInput[]
}
