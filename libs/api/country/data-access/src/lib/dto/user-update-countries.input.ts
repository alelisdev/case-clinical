import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCountryInput } from './user-update-country.input'

@InputType()
export class UserUpdateCountriesInput {
  @Field(() => [UserUpdateCountryInput], {nullable: true }) 
  countries: UserUpdateCountryInput[]
}
