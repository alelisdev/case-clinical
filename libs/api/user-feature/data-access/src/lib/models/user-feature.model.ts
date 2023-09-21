import { Field, ObjectType } from '@nestjs/graphql'

import { Feature } from '@case-clinical/api/feature/data-access'

import { User } from '@case-clinical/api/user/data-access'


@ObjectType()
export class UserFeature {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featureId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => Feature, { nullable: true }) 
  feature?: Feature  

  @Field(() => User, { nullable: true }) 
  user?: User  

}
