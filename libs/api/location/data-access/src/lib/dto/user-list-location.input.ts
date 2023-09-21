import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListLocationInput extends CorePagingInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  placeOfServiceId?: string

  @Field({ nullable: true })
  vendorLocationId?: string

  @Field({ nullable: true })
  vendorId?: string

  @Field({ nullable: true })
  clinicalProviderId?: string
}
