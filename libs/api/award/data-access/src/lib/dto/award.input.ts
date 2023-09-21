import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AwardInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  school?: string

  @Field({ nullable: true }) 
  awardedAt?: Date

  @Field({ nullable: true }) 
  note?: string
}
