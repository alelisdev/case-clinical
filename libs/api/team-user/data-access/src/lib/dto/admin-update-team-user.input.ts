import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateTeamInput } from '@case-clinical/api/team/data-access' 
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminUpdateTeamRoleInput } from '@case-clinical/api/team-role/data-access' 


@InputType()
export class AdminUpdateTeamUserInput {

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


  @Field(() => AdminUpdateTeamInput ,{ nullable: true }) 
  team?: AdminUpdateTeamInput  


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  


  @Field(() => AdminUpdateTeamRoleInput ,{ nullable: true }) 
  teamRole?: AdminUpdateTeamRoleInput  

}