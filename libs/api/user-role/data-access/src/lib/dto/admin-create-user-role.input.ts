import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateRoleInput } from '@case-clinical/api/role/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminCreateUserRoleInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => AdminCreateRoleInput ,{ nullable: true }) 
  role?: AdminCreateRoleInput  


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  

}