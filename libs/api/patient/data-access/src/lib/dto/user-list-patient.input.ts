import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListPatientInput extends CorePagingInput {
  @Field({ nullable: true })
  name?: string


  @Field({ nullable: true })
  ethnicityId?: string


  @Field({ nullable: true })
  genderId?: string


  @Field({ nullable: true })
  languageId?: string

  @Field({ nullable: true })
  fromDate?: Date

  @Field({ nullable: true })
  toDate?: Date

  @Field({ nullable: true })
  medicalRecordNumber?:string

  @Field({ nullable: true })
  clinicalProviderId?: string

  @Field({ nullable: true })
  locationId?: string

  @Field({ nullable: true })
  vendorLocationId?: string

  @Field({ nullable: true })
  isAllPatients?: boolean

  @Field({ nullable: true })
  subpoenaId?: string
}
