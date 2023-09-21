import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateRoleInput } from '@case-clinical/api/role/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserUpdateUserRoleInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => UserUpdateRoleInput ,{ nullable: true }) 
  role?: UserUpdateRoleInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  user?: UserUpdateUserInput  

}