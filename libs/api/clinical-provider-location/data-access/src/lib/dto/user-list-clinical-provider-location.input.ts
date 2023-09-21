import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListClinicalProviderLocationInput extends CorePagingInput {
  @Field({ nullable: true })
  name?: string


  @Field({ nullable: true })
  clinicalProviderId?: string


  @Field({ nullable: true })
  locationId?: string

  @Field({ nullable: true })
  favorite?: boolean

  @Field({ nullable: true })
  providerName?: string

  @Field(() => [String], { nullable: true })
  specialties?: string[]

  @Field(()=>[Number], { nullable: true })
  centerLocation?:number[]

  @Field( { nullable: true })
  distance?: number
}
