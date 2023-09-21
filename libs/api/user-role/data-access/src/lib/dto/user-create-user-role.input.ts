import { Field, InputType } from '@nestjs/graphql'

import { UserCreateRoleInput } from '@case-clinical/api/role/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserCreateUserRoleInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => UserCreateRoleInput ,{ nullable: true }) 
  role?: UserCreateRoleInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  

}
