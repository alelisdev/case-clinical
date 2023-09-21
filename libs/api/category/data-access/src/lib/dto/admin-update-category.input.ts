import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAuthorizationKindInput } from '@case-clinical/api/authorization-kind/data-access' 


@InputType()
export class AdminUpdateCategoryInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateAuthorizationKindInput], { nullable: true }) 
  authorizationKinds?: UserUpdateAuthorizationKindInput[]


}