import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 


@InputType()
export class UserUpdateAuthorizationCategoryInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateAuthorizationInput], { nullable: true }) 
  authorizations?: UserUpdateAuthorizationInput[]


}