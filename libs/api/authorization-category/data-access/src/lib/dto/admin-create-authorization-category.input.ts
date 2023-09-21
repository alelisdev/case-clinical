import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 


@InputType()
export class AdminCreateAuthorizationCategoryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateAuthorizationInput], { nullable: true }) 
  authorizations?: AdminCreateAuthorizationInput[]


}