import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAttorneyInput } from '@case-clinical/api/attorney/data-access' 


@InputType()
export class AdminUpdateAttorneyStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateAttorneyInput], { nullable: true }) 
  attorneys?: UserUpdateAttorneyInput[]


}