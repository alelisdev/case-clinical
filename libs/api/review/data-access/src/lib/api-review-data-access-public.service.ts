
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListReviewInput } from './dto/user-list-review.input'

@Injectable()
export class ApiReviewDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicReviews(input?: UserListReviewInput) {
    let name = input?.name ? input.name : undefined

    return this.data.review.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async publicSelectReviews(input?: UserListReviewInput) {
    let name = input?.name ? input.name : undefined

    return this.data.review.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountReviews(input?: UserListReviewInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.review.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicReview(reviewId) {

    return this.data.review.findUnique({ where: { id: reviewId } , include: {clinicalProvider: true}  })
  }
}


