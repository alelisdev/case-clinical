import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class VendorStats {

  @Field()
  totalPatientCount: number

  @Field()
  totalPatientPercent: number

  @Field()
  todayPatientCount: number

  @Field()
  todayPatientPercent: number

  @Field()
  appointmentCount: number

  @Field()
  appointmentsPercent: number
}


