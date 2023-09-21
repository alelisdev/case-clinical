import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateMedLevelInput } from './user-update-med-level.input'

@InputType()
export class UserUpdateMedLevelsInput {
  @Field(() => [UserUpdateMedLevelInput], {nullable: true }) 
  medLevels: UserUpdateMedLevelInput[]
}
