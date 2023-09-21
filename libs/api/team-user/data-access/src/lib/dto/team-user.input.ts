import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class TeamUserInput {

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
}
