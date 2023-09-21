import { Field, ObjectType } from '@nestjs/graphql'

import { Authorization } from '@case-clinical/api/authorization/data-access' 


@ObjectType()
export class AuthorizationType {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [Authorization], { nullable: true }) 
  authorizations?: Authorization[]


}
