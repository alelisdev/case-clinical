import { Field, ObjectType } from '@nestjs/graphql'

import { Team } from '@case-clinical/api/team/data-access'

import { User } from '@case-clinical/api/user/data-access'

import { TeamRole } from '@case-clinical/api/team-role/data-access'


@ObjectType()
export class TeamUser {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  teamId?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  teamRoleId?: string


  @Field(() => Team, { nullable: true }) 
  team?: Team  

  @Field(() => User, { nullable: true }) 
  user?: User  

  @Field(() => TeamRole, { nullable: true }) 
  teamRole?: TeamRole  

}
