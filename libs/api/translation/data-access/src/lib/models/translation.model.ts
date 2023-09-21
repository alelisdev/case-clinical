import { Field, ObjectType } from '@nestjs/graphql'



@ObjectType()
export class Translation {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  languageCode?: string

  @Field({ nullable: true }) 
  translation?: string


}
