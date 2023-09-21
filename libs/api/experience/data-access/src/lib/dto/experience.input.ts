import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ExperienceInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  workplace?: string

  @Field({ nullable: true }) 
  from?: Date

  @Field({ nullable: true }) 
  to?: Date
}
