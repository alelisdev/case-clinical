import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateTeamInput } from '@case-clinical/api/team/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 
import { AdminCreateTeamRoleInput } from '@case-clinical/api/team-role/data-access' 


@InputType()
export class AdminCreateTeamUserInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  teamId?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  teamRoleId?: string


  @Field(() => AdminCreateTeamInput ,{ nullable: true }) 
  team?: AdminCreateTeamInput  


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  


  @Field(() => AdminCreateTeamRoleInput ,{ nullable: true }) 
  teamRole?: AdminCreateTeamRoleInput  

}