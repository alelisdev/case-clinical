import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateTeamUserInput } from '@case-clinical/api/team-user/data-access' 


@InputType()
export class AdminCreateTeamInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateTeamUserInput], { nullable: true }) 
  teamUsers?: AdminCreateTeamUserInput[]


}