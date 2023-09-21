import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateVendorInput } from './user-update-vendor.input'

@InputType()
export class UserUpdateVendorsInput {
  @Field(() => [UserUpdateVendorInput], {nullable: true }) 
  vendors: UserUpdateVendorInput[]
}
