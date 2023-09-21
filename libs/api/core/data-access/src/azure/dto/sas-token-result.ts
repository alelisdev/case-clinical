import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SasTokenResult {
  @Field()
  storageUri?: string

  @Field()
  storageAccessToken?: string
}
