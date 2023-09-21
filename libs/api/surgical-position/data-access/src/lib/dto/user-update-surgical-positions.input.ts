import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateSurgicalPositionInput } from './user-update-surgical-position.input'

@InputType()
export class UserUpdateSurgicalPositionsInput {
  @Field(() => [UserUpdateSurgicalPositionInput], {nullable: true }) 
  surgicalPositions: UserUpdateSurgicalPositionInput[]
}
