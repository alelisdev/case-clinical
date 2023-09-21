import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 


@InputType()
export class UserCreateAuthorizationCategoryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateAuthorizationInput], { nullable: true }) 
  authorizations?: UserCreateAuthorizationInput[]


}
