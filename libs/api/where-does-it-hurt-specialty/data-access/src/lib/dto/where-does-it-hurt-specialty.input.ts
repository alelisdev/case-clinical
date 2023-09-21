import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class WhereDoesItHurtSpecialtyInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  whereDoesItHurtId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  ordinal?: number
}
