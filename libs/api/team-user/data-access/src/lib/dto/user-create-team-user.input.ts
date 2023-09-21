import { Field, InputType } from '@nestjs/graphql'

import { UserCreateTeamInput } from '@case-clinical/api/team/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 
import { UserCreateTeamRoleInput } from '@case-clinical/api/team-role/data-access' 


@InputType()
export class UserCreateTeamUserInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  teamId?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  teamRoleId?: string


  @Field(() => UserCreateTeamInput ,{ nullable: true }) 
  team?: UserCreateTeamInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  


  @Field(() => UserCreateTeamRoleInput ,{ nullable: true }) 
  teamRole?: UserCreateTeamRoleInput  

}
