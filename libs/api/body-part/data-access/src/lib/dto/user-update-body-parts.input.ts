import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateBodyPartInput } from './user-update-body-part.input'

@InputType()
export class UserUpdateBodyPartsInput {
  @Field(() => [UserUpdateBodyPartInput], {nullable: true }) 
  bodyParts: UserUpdateBodyPartInput[]
}
