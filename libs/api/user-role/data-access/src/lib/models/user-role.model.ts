import { Field, ObjectType } from '@nestjs/graphql'

import { Role } from '@case-clinical/api/role/data-access'

import { User } from '@case-clinical/api/user/data-access'


@ObjectType()
export class UserRole {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => Role, { nullable: true }) 
  role?: Role  

  @Field(() => User, { nullable: true }) 
  user?: User  

}
