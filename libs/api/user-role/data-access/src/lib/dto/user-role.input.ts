import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class UserRoleInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  userId?: string
}
