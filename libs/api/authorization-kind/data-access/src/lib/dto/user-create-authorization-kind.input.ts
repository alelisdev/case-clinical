import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCategoryInput } from '@case-clinical/api/category/data-access' 
import { UserCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class UserCreateAuthorizationKindInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  categoryId?: string

  @Field(() => [UserCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: UserCreatePriorAuthorizationRequestInput[]


  @Field(() => UserCreateCategoryInput ,{ nullable: true }) 
  category?: UserCreateCategoryInput  

}
