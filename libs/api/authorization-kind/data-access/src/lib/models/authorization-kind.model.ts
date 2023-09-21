import { Field, ObjectType } from '@nestjs/graphql'

import { Category } from '@case-clinical/api/category/data-access'
import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access' 


@ObjectType()
export class AuthorizationKind {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  categoryId?: string

  @Field(() => [PriorAuthorizationRequest], { nullable: true }) 
  priorAuthorizationRequests?: PriorAuthorizationRequest[]


  @Field(() => Category, { nullable: true }) 
  category?: Category  

}
