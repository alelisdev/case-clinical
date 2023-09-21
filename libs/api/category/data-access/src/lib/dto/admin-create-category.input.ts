import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAuthorizationKindInput } from '@case-clinical/api/authorization-kind/data-access' 


@InputType()
export class AdminCreateCategoryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateAuthorizationKindInput], { nullable: true }) 
  authorizationKinds?: AdminCreateAuthorizationKindInput[]


}