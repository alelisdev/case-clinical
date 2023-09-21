import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateFavoriteProviderInput } from './user-update-favorite-provider.input'

@InputType()
export class UserUpdateFavoriteProvidersInput {
  @Field(() => [UserUpdateFavoriteProviderInput], {nullable: true }) 
  favoriteProviders: UserUpdateFavoriteProviderInput[]
}
