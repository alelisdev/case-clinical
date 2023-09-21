import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminCreateShortcutInput {

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


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  

}