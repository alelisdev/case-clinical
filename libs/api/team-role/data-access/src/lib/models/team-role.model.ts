import { Field, ObjectType } from '@nestjs/graphql'

import { TeamUser } from '@case-clinical/api/team-user/data-access' 


@ObjectType()
export class TeamRole {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [TeamUser], { nullable: true }) 
  teamUsers?: TeamUser[]


}
