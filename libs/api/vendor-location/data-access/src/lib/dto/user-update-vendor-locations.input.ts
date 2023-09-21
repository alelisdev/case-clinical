import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateVendorLocationInput } from './user-update-vendor-location.input'

@InputType()
export class UserUpdateVendorLocationsInput {
  @Field(() => [UserUpdateVendorLocationInput], {nullable: true }) 
  vendorLocations: UserUpdateVendorLocationInput[]
}
