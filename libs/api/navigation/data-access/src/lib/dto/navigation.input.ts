import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class NavigationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  title?: string

  @Field({ nullable: true }) 
  subtitle?: string

  @Field({ nullable: true }) 
  type?: string

  @Field({ nullable: true }) 
  icon?: string

  @Field({ nullable: true }) 
  link?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  parentId?: string

}
