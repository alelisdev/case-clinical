import { Field, InputType } from '@nestjs/graphql'

import { UserCreateTeamUserInput } from '@case-clinical/api/team-user/data-access' 


@InputType()
export class UserCreateTeamRoleInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateTeamUserInput], { nullable: true }) 
  teamUsers?: UserCreateTeamUserInput[]


}
