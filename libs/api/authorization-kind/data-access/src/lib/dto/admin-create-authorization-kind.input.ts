import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateCategoryInput } from '@case-clinical/api/category/data-access' 
import { AdminCreatePriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access' 


@InputType()
export class AdminCreateAuthorizationKindInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  categoryId?: string

  @Field(() => [AdminCreatePriorAuthorizationRequestInput], { nullable: true }) 
  priorAuthorizationRequests?: AdminCreatePriorAuthorizationRequestInput[]


  @Field(() => AdminCreateCategoryInput ,{ nullable: true }) 
  category?: AdminCreateCategoryInput  

}