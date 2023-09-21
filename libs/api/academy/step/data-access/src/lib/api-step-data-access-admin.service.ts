import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'
import { AdminUpdateStepInput } from './dto/admin-update-step.input'
import { AdminListStepInput } from './dto/admin-list-step.input'
import { AdminCreateStepInput } from './dto/admin-create-step.input'

@Injectable()
export class ApiStepDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminSteps(adminId: string, input?: AdminListStepInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.step.findMany({
      where: {
        title: {
          contains: input?.title,
        },
      },
      take: input?.limit,
      skip: input?.skip,
      include: { course: true },
    })
  }

  async adminCountSteps(adminId: string, input?: AdminListStepInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.step.count({
      where: {
        title: {
          contains: input?.title,
        },
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async adminStep(adminId: string, stepId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.step.findUnique({
      where: { id: stepId },
      include: { course: true },
    })
  }

  async adminCreateStep(adminId: string, input: AdminCreateStepInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.step.create({
      data: {
        course:
          input.courseId != null
            ? {
                connect: {
                  id: input.courseId,
                },
              }
            : undefined,
        title: input.title,
        order: input.order,
        subtitle: input.subtitle,
        content: input.content
      },
      include: { course: true },
    })
  }

  async adminUpdateStep (
    adminId: string,
    stepId,
    input: AdminUpdateStepInput,
  ) {
    await this.data.ensureAdminUser(adminId)

    return this.data.step.update({
      where: { id: stepId },
      data: {
        title: input.title,
        order: input.order,
        subtitle: input.subtitle,
        content: input.content
      },
      include: { course: true },
    })
  }

  async adminDeleteStep(adminId: string, stepId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.step.delete({ where: { id: stepId } })
  }
}
