import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class DateFilterInput {
  @Field(() => String, { nullable: true, defaultValue: '=' })
  operator?: '='|'>'|'<'|'<='|'>='|'In'

  @Field(() => Date)
  startDate: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date
}
