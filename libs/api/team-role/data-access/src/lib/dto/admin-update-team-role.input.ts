import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateTeamUserInput } from '@case-clinical/api/team-user/data-access' 


@InputType()
export class AdminUpdateTeamRoleInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateTeamUserInput], { nullable: true }) 
  teamUsers?: UserUpdateTeamUserInput[]


}