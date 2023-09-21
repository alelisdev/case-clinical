import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateVendorTypeInput } from './user-update-vendor-type.input'

@InputType()
export class UserUpdateVendorTypesInput {
  @Field(() => [UserUpdateVendorTypeInput], {nullable: true }) 
  vendorTypes: UserUpdateVendorTypeInput[]
}
