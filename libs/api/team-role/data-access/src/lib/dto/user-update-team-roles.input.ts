import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateTeamRoleInput } from './user-update-team-role.input'

@InputType()
export class UserUpdateTeamRolesInput {
  @Field(() => [UserUpdateTeamRoleInput], {nullable: true }) 
  teamRoles: UserUpdateTeamRoleInput[]
}
