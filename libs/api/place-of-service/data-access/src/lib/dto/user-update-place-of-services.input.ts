import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePlaceOfServiceInput } from './user-update-place-of-service.input'

@InputType()
export class UserUpdatePlaceOfServicesInput {
  @Field(() => [UserUpdatePlaceOfServiceInput], {nullable: true }) 
  placeOfServices: UserUpdatePlaceOfServiceInput[]
}
