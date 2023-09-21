import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateRoleInput } from '@case-clinical/api/role/data-access' 
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminUpdateUserRoleInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => AdminUpdateRoleInput ,{ nullable: true }) 
  role?: AdminUpdateRoleInput  


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  

}