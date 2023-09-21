import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAttorneyInput } from '@case-clinical/api/attorney/data-access' 


@InputType()
export class UserCreateAttorneyTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateAttorneyInput], { nullable: true }) 
  attorneys?: UserCreateAttorneyInput[]


}
