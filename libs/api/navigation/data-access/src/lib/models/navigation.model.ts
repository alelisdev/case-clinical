import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '@case-clinical/api/user/data-access'

@ObjectType()
export class Navigation {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  title?: string

  @Field({ nullable: true }) 
  subtitle?: string

  @Field({ nullable: true }) 
  type?: string

  @Field({ nullable: true }) 
  icon?: string

  @Field({ nullable: true }) 
  link?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  parentId?: string

  @Field(() => [Navigation], { nullable: true }) 
  children?: Navigation[]


  @Field(() => User, { nullable: true }) 
  user?: User  

  @Field(() => Navigation, { nullable: true }) 
  parent?: Navigation  

}
