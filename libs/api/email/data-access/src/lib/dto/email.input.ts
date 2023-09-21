import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class EmailInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  email?: string

  @Field({ nullable: true }) 
  isPublic?: boolean

  @Field({ nullable: true }) 
  primary?: boolean

  @Field({ nullable: true }) 
  verified?: boolean

  @Field({ nullable: true }) 
  verifyToken?: string

  @Field({ nullable: true }) 
  verifyExpires?: Date

  @Field({ nullable: true }) 
  ownerId?: string
}
