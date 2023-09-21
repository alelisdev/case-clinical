import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class HoroscopeInput {

  @Field({ nullable: true })
  sign?: string

  @Field({ nullable: true })
  date?: Date

  @Field({ nullable: true })
  lang?: string
}
