import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserCreateShortcutInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  label?: string

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  icon?: string

  @Field({ nullable: true }) 
  link?: string

  @Field({ nullable: true }) 
  useRouter?: boolean

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  

}
