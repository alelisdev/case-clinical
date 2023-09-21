import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAuthorizationKindInput } from '@case-clinical/api/authorization-kind/data-access' 


@InputType()
export class UserCreateCategoryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateAuthorizationKindInput], { nullable: true }) 
  authorizationKinds?: UserCreateAuthorizationKindInput[]


}
