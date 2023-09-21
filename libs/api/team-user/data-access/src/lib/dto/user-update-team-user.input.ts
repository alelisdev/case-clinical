import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateTeamInput } from '@case-clinical/api/team/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { UserUpdateTeamRoleInput } from '@case-clinical/api/team-role/data-access' 


@InputType()
export class UserUpdateTeamUserInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  teamId?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  teamRoleId?: string


  @Field(() => UserUpdateTeamInput ,{ nullable: true }) 
  team?: UserUpdateTeamInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  user?: UserUpdateUserInput  


  @Field(() => UserUpdateTeamRoleInput ,{ nullable: true }) 
  teamRole?: UserUpdateTeamRoleInput  

}