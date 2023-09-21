import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateTeamUserInput } from './user-update-team-user.input'

@InputType()
export class UserUpdateTeamUsersInput {
  @Field(() => [UserUpdateTeamUserInput], {nullable: true }) 
  teamUsers: UserUpdateTeamUserInput[]
}
