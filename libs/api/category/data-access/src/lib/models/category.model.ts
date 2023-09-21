import { Field, ObjectType } from '@nestjs/graphql'

import { AuthorizationKind } from '@case-clinical/api/authorization-kind/data-access' 


@ObjectType()
export class Category {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AuthorizationKind], { nullable: true }) 
  authorizationKinds?: AuthorizationKind[]


}
