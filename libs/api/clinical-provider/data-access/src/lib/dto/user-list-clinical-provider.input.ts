import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'
import { number } from 'joi'

@InputType()
export class UserListClinicalProviderInput extends CorePagingInput {
  @Field({ nullable: true })
  name?: string


  @Field({ nullable: true })
  vendorId?: string

  @Field({ nullable: true })
  clinicalProviderId?: string

  @Field({ nullable: true })
  clinicalProviderLocationId?: string

  @Field({ nullable: true })
  locationId?: string

  @Field(() => [String], { nullable: true })
  specialites?: string[]

  @Field(() => [String], { nullable: true })
  services?: string[]

  @Field(()=>[Number], { nullable: true })
  centerLocation?:number[]

  @Field( { nullable: true })
  distance?: string

  @Field( { nullable: true })
  isDoctorsPage?: boolean

  @Field( { nullable: true })
  favorites?: boolean
}
