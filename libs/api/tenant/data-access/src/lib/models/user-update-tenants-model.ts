import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UpdateTenantsResult {
  @Field()
  total: number

  @Field({nullable: true})
  updated?: number

  @Field({nullable: true})
  created?: number

  @Field({ nullable: true })
  failed?: number
}
