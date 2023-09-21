import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateTeamInput } from './user-update-team.input'

@InputType()
export class UserUpdateTeamsInput {
  @Field(() => [UserUpdateTeamInput], {nullable: true }) 
  teams: UserUpdateTeamInput[]
}
