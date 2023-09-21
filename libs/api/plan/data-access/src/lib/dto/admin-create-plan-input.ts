import { Field,InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreatePlanInput {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  detail: string

  @Field({ nullable: true })
  price: number
}
