import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateCategoryInput } from '@case-clinical/api/category/data-access' 
import { UserUpdatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminUpdateAuthorizationKindInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  categoryId?: string

  @Field(() => [UserUpdatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: UserUpdatePriorAuthorizationRequestInput[]


  @Field(() => AdminUpdateCategoryInput ,{ nullable: true }) 
  category?: AdminUpdateCategoryInput  

}