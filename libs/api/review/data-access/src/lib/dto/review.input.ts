import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ReviewInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  comment?: string

  @Field({ nullable: true }) 
  rating?: number

  @Field({ nullable: true }) 
  reivewDateAndTime?: Date

  @Field({ nullable: true }) 
  parentId?: string
}
