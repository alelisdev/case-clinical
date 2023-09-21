import { Field, ObjectType } from '@nestjs/graphql'

import { User } from '@case-clinical/api/user/data-access'


@ObjectType()
export class Shortcut {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  label?: string

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  icon?: string

  @Field({ nullable: true }) 
  link?: string

  @Field({ nullable: true }) 
  useRouter?: boolean

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => User, { nullable: true }) 
  user?: User  

}
