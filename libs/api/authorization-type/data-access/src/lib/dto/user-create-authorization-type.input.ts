import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 


@InputType()
export class UserCreateAuthorizationTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateAuthorizationInput], { nullable: true }) 
  authorizations?: UserCreateAuthorizationInput[]


}
