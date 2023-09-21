import { ApiCoreSharedService, CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { UserCreateAppointmentInput } from './dto/user-create-appointment.input'
import { UserListAppointmentInput } from './dto/user-list-appointment.input'
import { UserUpdateAppointmentInput } from './dto/user-update-appointment.input'
import { UserUpdateAppointmentsInput } from './dto/user-update-appointments.input'
import { ApiNovuNotificationDataAccessService } from '@case-clinical/api/novu-notification/data-access'
import { UserCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access'
import { UserCreateClaimInput } from '@case-clinical/api/claim/data-access'

@Injectable()
export class ApiAppointmentDataAccessUserService {
  constructor(
    private readonly data: ApiCoreSharedService,
    private notificationService: ApiNovuNotificationDataAccessService,
  ) { }

  async userAppointments(userId: string, input?: UserListAppointmentInput) {
    const user = await this.data.user.findUnique({ where: { id: userId } })

    if (user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } })
      input.firmId = attorney.firmId
    }

    // Attorney Related Filtering
    let attorneyIds
    if (input.attorneyId) {
      attorneyIds = [input.attorneyId]
    } else if (input.firmId) {
      attorneyIds = (await this.data.attorney.findMany({ where: { firmId: input.firmId } })).flatMap(
        (attorney) => attorney.id,
      )
    }

    let clinicalProviderIds = undefined
    if (input.clinicalProviderId) clinicalProviderIds = [input.clinicalProviderId]

    if (user.patientId) {
      input.patientId = user.patientId
    }
    if (user.vendorId) {
      input.locationId = (input?.locationId == '' || input?.locationId == 'all') ? undefined : input?.locationId;
      if (input.clinicalProviderId === '' || !input.clinicalProviderId)
        clinicalProviderIds = (
          await this.data.clinicalProvider.findMany({ where: { vendorId: user.vendorId } })
        ).flatMap((provider) => provider.id)
      else clinicalProviderIds = [input.clinicalProviderId]
    }

    const dateFilter = this.data.parseDateFilter(input.dateFilter)

    return this.data.appointment.findMany({
      where: {
        AND: [
          {
            name: input.name ? { contains: input.name } : undefined,
            locationId: input.locationId,
            medicalReportId: input.medicalReportId,
            billId: input.billId,
            imagingId: input.imagingId,
            miscellaneousId: input.miscellaneousId,
            patientId: input.patientId,
            legalCaseId: input.legalCaseId,
            visitKindId: input.visitKindId,
            clinicalProviderId: {
              in: clinicalProviderIds,
            },
            legalCase: attorneyIds
              ? {
                attorneyId: { in: attorneyIds },
              }
              : undefined,
            medicalRecordStatusId:(input?.medicalRecordStatusOptions && input?.medicalRecordStatusOptions.length > 0)
            ? { in : input.medicalRecordStatusOptions}
            : undefined,
            appointmentStatusId: input.appointmentStatusId
              ? input.appointmentStatusId
              : undefined,
            appointmentDateAndTime: dateFilter ? dateFilter : undefined,
          },
        ],
      },
      orderBy: [
        {
          appointmentDateAndTime: 'desc',
        },
      ],
      take: input?.limit,
      skip: input?.skip,
      include: {
        location: true,
        medicalReport: true,
        bill: true,
        miscellaneous: true,
        imaging: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
            vendor: true,
          },
        },
        medicalRecordStatus: true,
        legalCase: { include: { caseStatus: true } },
        appointmentStatus: true,visitKind: true,
        assignedTo: true,
      },
    })
  }

  async userCountAppointments(userId: string, input?: UserListAppointmentInput): Promise<CorePaging> {
    const user = await this.data.user.findUnique({ where: { id: userId } })

    if (user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } })
      input.firmId = attorney.firmId
    }

    // Attorney Related Filtering
    let attorneyIds
    if (input.attorneyId) {
      attorneyIds = [input.attorneyId]
    } else if (input.firmId) {
      attorneyIds = (await this.data.attorney.findMany({ where: { firmId: input.firmId } })).flatMap(
        (attorney) => attorney.id,
      )
    }

    let clinicalProviderIds = undefined
    if (input.clinicalProviderId) clinicalProviderIds = [input.clinicalProviderId]

    if (user.patientId) {
      input.patientId = user.patientId
    } else if (user.vendorId) {
      if (input.clinicalProviderId === '' || !input.clinicalProviderId)
        clinicalProviderIds = (
          await this.data.clinicalProvider.findMany({ where: { vendorId: user.vendorId } })
        ).flatMap((provider) => provider.id)
      else clinicalProviderIds = [input.clinicalProviderId]
    }

    const dateFilter = this.data.parseDateFilter(input.dateFilter)

    const total = await this.data.appointment.count({
      where: {
        AND: [
          {
            name: input.name ? { contains: input.name } : undefined,
            locationId: input.locationId,
            medicalReportId: input.medicalReportId,
            billId: input.billId,
            imagingId: input.imagingId,
            miscellaneousId: input.miscellaneousId,
            patientId: input.patientId,
            legalCaseId: input.legalCaseId,
            visitKindId: input.visitKindId,
            clinicalProviderId: {
              in: clinicalProviderIds,
            },
            legalCase: attorneyIds
              ? {
                attorneyId: { in: attorneyIds },
              }
              : undefined,
            medicalRecordStatusId:(input?.medicalRecordStatusOptions && input?.medicalRecordStatusOptions.length > 0)
            ? { in : input.medicalRecordStatusOptions}
            : undefined,
            appointmentStatusId: input.appointmentStatusId
              ? input.appointmentStatusId
              : undefined,
            appointmentDateAndTime: dateFilter ? dateFilter : undefined,
          },
        ],
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userTotalAppointments(userId: string, input?: UserListAppointmentInput) {
    const user = await this.data.user.findUnique({ where: { id: userId } })

    const pendingAppintmentStatus = await this.data.appointmentStatus.findFirst({
      where: {
        name: 'Pending',
      },
    })
    const approvedAppintmentStatus = await this.data.appointmentStatus.findFirst({
      where: {
        name: 'Approved',
      },
    })

    let attorneyId = input.attorneyId
    if (input.attorneyId === '' || !input.attorneyId) {
      attorneyId = input.attorneyId
    }

    if (input.attorneyId === 'all') attorneyId = undefined

    const pendingAppointments = await this.data.appointment.findMany({
      where: {
        AND: [
          {
            legalCase: {
              attorneyId: attorneyId,
            },
            appointmentStatusId: pendingAppintmentStatus?.id,
          },
        ],
      },
      include: {
        legalCase: true,
      },
    })

    const pendingCount = pendingAppointments.length

    const approvedAppointments = await this.data.appointment.findMany({
      where: {
        AND: [
          {
            legalCase: {
              attorneyId: attorneyId,
            },
            appointmentStatusId: approvedAppintmentStatus?.id,
          },
        ],
      },
      include: {
        legalCase: true,
      },
    })

    const approvedCount = approvedAppointments.length

    const needdAppointments = await this.data.appointment.findMany({
      where: {
        AND: [
          {
            legalCase: {
              attorneyId: attorneyId,
            },
          },
        ],
      },
      include: {
        legalCase: true,
      },
    })

    let needCount = needdAppointments.length
    needCount = needCount - pendingCount - approvedCount
    const resultCount = {
      pendingCount: pendingCount,
      approvedCount: approvedCount,
      needCount: needCount,
    }
    return resultCount
  }

  async userRequestReschedule(appointmentId: string) {
    const appointment = await this.data.appointment.findUnique({ where: { id: appointmentId }, include: {
      location: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
          },
        },
        legalCase: { include: { caseStatus: true } },
        appointmentStatus: true,visitKind: true,
        assignedTo: true,
    } });

    if(appointment?.appointmentStatus?.name !== 'Cancelled') {
      throw new BadRequestException('You can request reschedule only for Cancelled appointments');
    }

    const vendorUser = await this.data.user.findFirst({ where: { vendorId: appointment.clinicalProvider.vendorId }, include: { emails: true } })
    // Send Confirm Notification to Attorney and Vendor
    if(vendorUser.emails?.length > 0){
      const firstEmail = vendorUser.emails.at(0).email;
      this.notificationService.sendAppointmentRescheduleNotification(vendorUser.id, firstEmail, appointment.id, appointment.patient.name, appointment.appointmentDateAndTime, appointment.start, appointment.location?.name)
    }
    return appointment;
  }

  async userRescheduleAppointment(appointmentId: string, date: Date) {
    const appointment = await this.data.appointment.findUnique({ where: { id: appointmentId }, include: {
      location: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
          },
        },
        legalCase: { include: { caseStatus: true } },
        appointmentStatus: true,visitKind: true,
    } });

    if(appointment?.appointmentStatus?.name !== 'Cancelled') {
      throw new BadRequestException('You can reschedule only for Cancelled appointments');
    }

    // First find pending status
    const rescheduledStatus = await this.data.appointmentStatus.findFirst({
      where: {
        name: 'Rescheduled',
      },
    })
    // Appoinment should be pending to run this action
    if (!rescheduledStatus) {
      throw new BadRequestException('Cannot find Rescheduled status in AppointmentStatus table')
    }

    const rescheduledAppointment = await this.data.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        appointmentStatus: {
          connect : { id: rescheduledStatus.id }
        },
        appointmentDateAndTime: date
      },
      include: {
        appointmentStatus: true,visitKind: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
          },
        },
        legalCase: { include: { caseStatus: true } },
        location: true,
        assignedTo: true,
      },
    })

    // Send appointment confirmation request to patient
    const patientUser = await this.data.user.findFirst({
      where: { patientId: rescheduledAppointment.patientId },
      include: { emails: true },
    })
    if (patientUser) {
      if (patientUser.emails?.length > 0) {
        const firstEmail = patientUser.emails.at(0).email
        this.notificationService.confirmRequest(
          patientUser.id,
          firstEmail,
          rescheduledAppointment.id,
          rescheduledAppointment.clinicalProvider.name,
          rescheduledAppointment.appointmentDateAndTime,
          rescheduledAppointment.start,
          rescheduledAppointment.location?.name,
        )
      }
    }
    return rescheduledAppointment;
  }

  async userCheckInAppointment(appoinmentId: string) {
    const appointment = await this.data.appointment.findFirst({
      where: {
        id: appoinmentId,
      },
      include: {
        appointmentStatus: true,visitKind: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
          },
        },
        legalCase: { include: { caseStatus: true } },
      },
    })
    if (!appoinmentId) throw new BadRequestException('Appoinment does not exist')

    // Appoinment should be pending to run this action
    if (appointment.appointmentStatus.name !== 'Confirmed') {
      throw new BadRequestException('You can check only confirmed appointments')
    }

    const checkedInAppintmentStatus = await this.data.appointmentStatus.findFirst({
      where: {
        name: 'Checked In',
      },
    })

    if (!checkedInAppintmentStatus) {
      throw new InternalServerErrorException('Appointment status named Checked In does not exist')
    }

    const updatedAppointment = await this.data.appointment.update({
      where: { id: appoinmentId },
      data: {
        appointmentStatusId: checkedInAppintmentStatus.id,
        checkedIn: true,
        checkedInDateTime: new Date(),
      },
      include: {
        location: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
          },
        },
        legalCase: { include: { caseStatus: true } },
        appointmentStatus: true,visitKind: true,
        assignedTo: true,
      },
    })

    const vendorUser = await this.data.user.findFirst({ where: { vendorId: updatedAppointment.clinicalProvider.vendorId }, include: { emails: true } })
    // Send Confirm Notification to Attorney and Vendor
    if(vendorUser.emails?.length > 0){
      const firstEmail = vendorUser.emails.at(0).email;
      this.notificationService.sendAppointmentCheckInNotification(vendorUser.id, firstEmail, appointment.id, appointment.clinicalProvider.name, appointment.appointmentDateAndTime, appointment.start, updatedAppointment.location.name)
    }

    if (updatedAppointment.legalCase) {
      const attornyUser = await this.data.user.findFirst({
        where: { attorneyId: updatedAppointment.legalCase.attorneyId },
        include: { emails: true },
      })

      if (attornyUser?.emails?.length > 0) {
        const firstEmail = attornyUser.emails.at(0).email
        this.notificationService.sendAppointmentCheckInNotification(
          attornyUser.id,
          firstEmail,
          appointment.id,
          appointment.clinicalProvider.name,
          appointment.appointmentDateAndTime,
          appointment.start,
          updatedAppointment.location.name,
        )
      }
    }


    return updatedAppointment
  }

  async userConfirmAppointment(appoinmentId: string) {
    const appointment = await this.data.appointment.findFirst({
      where: {
        id: appoinmentId,
      },
      include: {
        appointmentStatus: true,visitKind: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
          },
        },
        legalCase: { include: { caseStatus: true } },
      },
    })
    if (!appoinmentId) throw new BadRequestException('Appoinment does not exist')

    // Appoinment should be pending to run this action
    if (appointment.appointmentStatus.name !== 'Pending') {
      throw new BadRequestException('You can confirm only pending appointments')
    }

    const confirmedStatus = await this.data.appointmentStatus.findFirst({
      where: {
        name: 'Confirmed',
      },
    })

    if (!confirmedStatus) {
      throw new InternalServerErrorException('Appointment status named Confirmed does not exist')
    }

    const updatedAppointment = await this.data.appointment.update({
      where: { id: appoinmentId },
      data: {
        appointmentStatusId: confirmedStatus.id,
      },
      include: {
        location: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
          },
        },
        assignedTo: true,
        legalCase: { include: { caseStatus: true } },
        appointmentStatus: true,visitKind: true,
      },
    })
    console.log('confirmed appointment successfully!!')
    const vendorUser = await this.data.user.findFirst({ where: { vendorId: updatedAppointment.clinicalProvider.vendorId }, include: { emails: true } })
    const attornyUser = await this.data.user.findFirst({
      where: { attorneyId: updatedAppointment.legalCase?.attorneyId },
      include: { emails: true },
    })

    // Send Confirm Notification to Attorney and Vendor
    if (vendorUser?.emails?.length > 0) {
      const firstEmail = vendorUser.emails.at(0).email
      this.notificationService.sendAppointmentCheckInRequest(
        vendorUser.id,
        firstEmail,
        appointment.id,
        appointment.patient.name,
        appointment.appointmentDateAndTime,
        appointment.start,
        updatedAppointment.location?.name,
      )
    }
    console.log('sent checkin request to provider');
    if (attornyUser?.emails?.length > 0) {
      const firstEmail = attornyUser.emails.at(0).email
      this.notificationService.informAppointmentConfirmed(
        attornyUser.id,
        firstEmail,
        appointment.id,
        appointment.patient.name,
        appointment.clinicalProvider.name,
        appointment.appointmentDateAndTime,
        appointment.start,
        updatedAppointment.location?.name,
      )
    }

    return updatedAppointment
  }

  async userCancelAppointment(appointmentId) {
    const appointment = await this.data.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: { appointmentStatus: true,visitKind: true, patient: { include: { users: true, gender: true } } },
    })
    if (!appointmentId) throw new BadRequestException('Appoinment does not exist')

    // Appoinment should be pending to run this action
    if (appointment.appointmentStatus.name !== 'Pending' && appointment.appointmentStatus.name !== 'Confirmed') {
      throw new BadRequestException('You can cancel only pending or confirmed appointments')
    }

    const pendingAppintmentStatus = await this.data.appointmentStatus.findFirst({
      where: {
        name: 'Cancelled',
      },
    })

    if (!pendingAppintmentStatus) {
      throw new InternalServerErrorException('Appointment status named Cancelled does not exist')
    }

    const updatedAppointment = await this.data.appointment.update({
      where: { id: appointmentId },
      data: {
        appointmentStatusId: pendingAppintmentStatus.id,
        checkedIn: false,
        checkedInDateTime: null,
      },
      include: {
        location: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
          },
        },
        assignedTo: true,
        legalCase: { include: { caseStatus: true } },
        appointmentStatus: true,visitKind: true,
      },
    })

    // const vendorUser = await this.data.user.findFirst({ where: { vendorId: updatedAppointment.clinicalProvider.vendorId }, include: { emails: true } })
    const patientUser = await this.data.user.findFirst({ where: { patientId: updatedAppointment.patientId }, include: { emails: true } })
    const attornyUser = await this.data.user.findFirst({
      where: { attorneyId: updatedAppointment.legalCase?.attorneyId },
      include: { emails: true },
    })

    // Send Confirm Notification to Attorney and Vendor
    // if(vendorUser.emails?.length > 0){
    //   const firstEmail = vendorUser.emails.at(0).email;
    //   this.notificationService.informAppointmentCancelled(
    //     vendorUser.id,
    //     firstEmail,
    //     appointment.id,
    //     updatedAppointment.clinicalProvider.name,
    //     appointment.appointmentDateAndTime,
    //     appointment.start,
    //     updatedAppointment.location?.name,
    //   )
    // }

    if (attornyUser?.emails?.length > 0) {
      const firstEmail = attornyUser.emails.at(0).email
      this.notificationService.informAppointmentCancelled(
        attornyUser.id,
        firstEmail,
        appointment.id,
        updatedAppointment.clinicalProvider.name,
        appointment.appointmentDateAndTime,
        appointment.start,
        updatedAppointment.location?.name,
      )
    }

    if (patientUser?.emails?.length > 0) {
      const firstEmail = patientUser.emails.at(0).email
      this.notificationService.informAppointmentCancelled(
        patientUser.id,
        firstEmail,
        appointment.id,
        updatedAppointment.clinicalProvider.name,
        appointment.appointmentDateAndTime,
        appointment.start,
        updatedAppointment.location?.name,
      )
    }

    return updatedAppointment
  }

  async userHideAppointment(appointmentId) {
    const appointment = await this.data.appointment.findFirst({
      where: {
        id: appointmentId,
      },
      include: { appointmentStatus: true,visitKind: true, patient: { include: { users: true, gender: true } } },
    })
    if (!appointmentId) throw new BadRequestException('Appoinment does not exist')

    // Appoinment should be pending to run this action
    if (appointment.appointmentStatus.name === 'Pending') {
      throw new BadRequestException('You can hide only non-pending appointments')
    }

    const hideAppintmentStatus = await this.data.appointmentStatus.findFirst({
      where: {
        name: 'No Showed',
      },
    })

    if (!hideAppintmentStatus) {
      throw new InternalServerErrorException('Appointment status named No showed does not exist')
    }

    return this.data.appointment.update({
      where: { id: appointmentId },
      data: {
        appointmentStatusId: hideAppintmentStatus.id,
      },
      include: {
        location: true,
        patient: { include: { users: true, gender: true } },
        clinicalProvider: {
          include: {
            clinicalProviderLocations: { include: { location: true } },
            clinicalProviderSpecialties: { include: { specialty: true } },
            profileImage: true,
          },
        },
        legalCase: { include: { caseStatus: true } },
        appointmentStatus: true,
        visitKind: true,
        assignedTo: true,
      },
    })
  }

  async userSelectAppointments(userId: string, input?: UserListAppointmentInput) {
    const user = await this.data.user.findUnique({ where: { id: userId } })
    let clinicalProviderIds = undefined

    if (user.patientId) {
      input.patientId = user.patientId
    } else if (user.vendorId) {
      input
      clinicalProviderIds = (await this.data.clinicalProvider.findMany({ where: { vendorId: user.vendorId } })).flatMap(
        (provider) => provider.id,
      )
    }
    const name = input?.name ? input.name : undefined

    return this.data.appointment.findMany({
      where: {
        AND: [
          {
            name: { contains: name },
            locationId: input.locationId,
            medicalReportId: input.medicalReportId,
            billId: input.billId,
            imagingId: input.imagingId,
            miscellaneousId: input.miscellaneousId,
            patientId: input.patientId,
            visitKindId: input.visitKindId,
            clinicalProviderId: {
              in: clinicalProviderIds,
            },
            legalCaseId: input.legalCaseId,
            appointmentStatusId: input.appointmentStatusId,
          },
        ],
      },
      select: {
        id: true,
        name: true,
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userAppointment(userId: string, appointmentId) {
    const appointment = await this.data.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        location: true,
        medicalReport: true,
        bill: true,
        imaging: true,
        patient: true,
        clinicalProvider: true,
        legalCase: true,
        miscellaneous: true,
        appointmentStatus: true,
        visitKind: true,
        assignedTo: true,
        medicalRecordStatus: true,
        caseProcedures: {
          include: {
            legalCase: true,
            appointment: true,
            location: true,
          },
        },
        claimProcedures: { include: { placeOfService: true, claimStatus: true, claim: true, appointment: true } },
      },
    })

    if (appointment.medicalReportId)
      appointment.medicalReport = await this.data.userDocument(userId, appointment.medicalReportId)
    if (appointment.billId) appointment.bill = await this.data.userDocument(userId, appointment.billId)
    if (appointment.imagingId) appointment.imaging = await this.data.userDocument(userId, appointment.imagingId)
    if (appointment.miscellaneousId) appointment.miscellaneous = await this.data.userDocument(userId, appointment.miscellaneousId)
    return appointment
  }

  async formatDateTime(dateTime: Date) {
    return dateTime.toLocaleString('en-US', { timeZone: 'America/New_York' })
  }

  async checkAppointmentExist(appointmentName: string, patientId: string, legalCaseId: string) {
    try {
      return this.data.appointment.findMany({
        where: { name: appointmentName, patientId: patientId, legalCaseId: legalCaseId },
      })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userUploadBill(userId: string, input: UserUpdateAppointmentInput){
    if (input.bill) {
      const billId = (await this.data.userCreateDocument(userId, input.bill)).id
      if (billId) {
        input.billId = billId
      }

      this.data.appointment.update({
        where: { id: input.id },
        data: {
          bill:
            input.billId != null
              ? {
                connect: {
                  id: input.billId,
                },
              }
              : undefined,
        },
        include: {bill: true}
      } )
    }
  }

  async userCreateAppointment(userId: string, input: UserCreateAppointmentInput) {
    const sendingUser = await this.data.user.findFirst({ where: { id: userId } })
    if (sendingUser.patientId) input.patientId = sendingUser.patientId

    // If AppointmentStatus is undefined in input, set Pending as default
    if (!input.appointmentStatusId) {
      // First find pending status
      const pendingStatus = await this.data.appointmentStatus.findFirst({
        where: {
          name: 'Pending',
        },
      })
      // Appoinment should be pending to run this action
      if (!pendingStatus) {
        throw new BadRequestException('Cannot find pending status in AppointmentStatus table')
      }
      input.appointmentStatusId = pendingStatus.id
    }

    try {
      const appointmentData = await this.checkAppointmentExist(input.name, input.patientId, input.legalCaseId)

      if (appointmentData.length > 0) {
        throw new ConflictException('Record must be unique.')
      }

      if (input.medicalReport) {
        const medicalReportId = (await this.data.userCreateDocument(userId, input.medicalReport)).id
        if (medicalReportId) {
          input.medicalReportId = medicalReportId
        }
      }

      if (input.bill) {
        const billId = (await this.data.userCreateDocument(userId, input.bill)).id
        if (billId) {
          input.billId = billId
        }
      }

      if (input.miscellaneous) {
        const miscellaneousId = (await this.data.userCreateDocument(userId, input.miscellaneous)).id
        if (miscellaneousId) {
          input.miscellaneousId = miscellaneousId
        }
      }

      if (input.imaging) {
        const imagingId = (await this.data.userCreateDocument(userId, input.imaging)).id
        if (imagingId) {
          input.imagingId = imagingId
        }
      }

      await this.data.logEvent(sendingUser, true, 'Appointment', 'Create', input)

      const appointment = await this.data.appointment.create({
        data: {
          location:
            input.locationId != null
              ? {
                connect: {
                  id: input.locationId,
                },
              }
              : undefined,
          medicalReport:
            input.medicalReportId != null
              ? {
                connect: {
                  id: input.medicalReportId,
                },
              }
              : undefined,
          bill:
            input.billId != null
              ? {
                connect: {
                  id: input.billId,
                },
              }
              : undefined,
            miscellaneous:
            input.miscellaneousId != null
              ? {
                connect: {
                  id: input.miscellaneousId,
                },
              }
              : undefined,
          imaging:
            input.imagingId != null
              ? {
                connect: {
                  id: input.imagingId,
                },
              }
              : undefined,
          patient:
            input.patientId != null
              ? {
                connect: {
                  id: input.patientId,
                },
              }
              : undefined,
          assignedTo: input.assignedToId ? {
            connect: {
              id: input.assignedToId
            }
          } : undefined,
          clinicalProvider:
            input.clinicalProviderId != null
              ? {
                connect: {
                  id: input.clinicalProviderId,
                },
              }
              : undefined,
          legalCase:
            input.legalCaseId != null
              ? {
                connect: {
                  id: input.legalCaseId,
                },
              }
              : undefined,
          appointmentStatus:
            input.appointmentStatusId != null
              ? {
                connect: {
                  id: input.appointmentStatusId,
                },
              }
              : undefined,
          visitKind:
            input.visitKindId != null
              ? {
                connect: {
                  id: input.visitKindId,
                },
              }
              : undefined,
          medicalRecordStatus: input.medicalRecordStatusId ? {
            connect: {
              id: input.medicalRecordStatusId
            }
          } : undefined,
          name: input.name,
          appointmentDateAndTime: input.appointmentDateAndTime,
          checkedIn: input.checkedIn,
          checkedInDateTime: input.checkedInDateTime,
          duration: input.duration,
          notes: input.notes,
          isFirstInstance: input.isFirstInstance,
          description: input.description,
          recurringEventId: input.recurringEventId,
          start: input.start,
          end: input.end,
          allDay: input.allDay,
          recurrence: input.recurrence,
          finalVisitApproved: input.finalVisitApproved
        },
        include: {
          location: true,
          medicalReport: true,
          bill: true,
          imaging: true,
          patient: true,
          miscellaneous: true,
          clinicalProvider: true,
          legalCase: true,
          appointmentStatus: true,
          visitKind: true,
          caseProcedures: true,
          assignedTo: true,
          medicalRecordStatus: true,
          claimProcedures: { include: { placeOfService: true, claimStatus: true, claim: true, appointment: true } },
        },
      })

      if (appointment.appointmentStatus.name === 'Pending') {
        // Send appointment confirmation request to patient
        const patientUser = await this.data.user.findFirst({
          where: { patientId: input.patientId },
          include: { emails: true },
        })
        if (patientUser) {
          if (patientUser.emails?.length > 0) {
            const firstEmail = patientUser.emails.at(0).email
            this.notificationService.confirmRequest(
              patientUser.id,
              firstEmail,
              appointment.id,
              appointment.clinicalProvider.name,
              appointment.appointmentDateAndTime,
              appointment.start,
              appointment.location?.name,
            )
          }
        }

        // Inform vendor that new appointment has been created
        if (input.notifyProvider) {
          const vendorUser = await this.data.user.findFirst({
            where: { vendorId: appointment.clinicalProvider.vendorId },
            include: { emails: true },
          })
          if (vendorUser && vendorUser.emails?.length > 0) {
            const firstEmail = vendorUser.emails.at(0).email
            this.notificationService.sendAppointmentNotifyNotification(
              vendorUser.id,
              firstEmail,
              appointment.id,
              appointment.patient.name,
              appointment.appointmentDateAndTime,
              appointment.start,
              appointment.location.name,
            )
          }
        }
      }

      await this.data.logEvent(sendingUser, false, 'Appointment', 'Create', appointment)

      return appointment
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException('Error in creating Appointment')
    }
  }

  async userUpdateAppointment(userId: string, appointmentId: string, input: UserUpdateAppointmentInput) {
    const sendingUser = await this.data.user.findFirst({ where: { id: userId } })
    console.log(appointmentId, input);
    try {
      if (!appointmentId) {
        throw new BadRequestException('Appointment Id is required')
      } else {
        const appointmentData = await this.checkAppointmentExist(input.name, input.patientId, input.legalCaseId)

        if (appointmentData.length > 0) {
          if (appointmentData[0].id != appointmentId) {
            throw new ConflictException('Record must be unique.')
          }
        }

        if (input.medicalReport && !input.medicalReportId) {
          const medicalReportId = (await this.data.userCreateDocument(userId, input.medicalReport)).id
          if (medicalReportId) {
            input.medicalReportId = medicalReportId
          }
        }

        if (input.miscellaneous && !input.miscellaneousId) {
          const miscellaneousId = (await this.data.userCreateDocument(userId, input.miscellaneous)).id
          if (miscellaneousId) {
            input.miscellaneousId = miscellaneousId
          }
        }

        if (input.bill && !input.billId) {
          const billId = (await this.data.userCreateDocument(userId, input.bill)).id
          if (billId) {
            input.billId = billId
          }
        }

        if (input.imaging && !input.imagingId) {
          const imagingId = (await this.data.userCreateDocument(userId, input.imaging)).id
          if (imagingId) {
            input.imagingId = imagingId
          }
        }

        if(!input.medicalRecordStatusId && input.medicalRecordStatus) {
          const medicalRecordStatus = await this.data.medicalRecordStatus.findFirst({ where: {
            id: input.medicalRecordStatus.id,
            name: input.medicalRecordStatus.name,
          }})
          if(!medicalRecordStatus) throw new BadRequestException(`Cannot find medicalRecordStatus named ${input.medicalRecordStatus.name}`);
          else input.medicalRecordStatusId = medicalRecordStatus.id;
        }

        if(!input.appointmentStatusId && input.appointmentStatus) {
          const appointmentStatus = await this.data.appointmentStatus.findFirst({
            where: {
              id: input.appointmentStatus.id,
              name: input.appointmentStatus.name,
            }
          })
          if(!appointmentStatus) throw new BadRequestException(`Cannot find appointmentStatus named ${input.appointmentStatus.name}`);
          else input.appointmentStatusId = appointmentStatus.id;
        }

        await this.data.logEvent(sendingUser, true, 'Appointment', 'Update', input)

        const appointment = this.data.appointment.update({
          where: { id: appointmentId },
          data: {
            location:
              input.locationId != null
                ? {
                  connect: {
                    id: input.locationId,
                  },
                }
                : undefined,
            medicalReport:
              input.medicalReportId != null
                ? {
                  connect: {
                    id: input.medicalReportId,
                  },
                }
                : undefined,
                miscellaneous:
              input.miscellaneousId != null
                ? {
                  connect: {
                    id: input.miscellaneousId,
                  },
                }
                : undefined,
            bill:
              input.billId != null
                ? {
                  connect: {
                    id: input.billId,
                  },
                }
                : undefined,
            assignedTo: input.assignedToId ? {
              connect: {
                id: input.assignedToId
              }
            } : undefined,
            imaging:
              input.imagingId != null
                ? {
                  connect: {
                    id: input.imagingId,
                  },
                }
                : undefined,
            patient:
              input.patientId != null
                ? {
                  connect: {
                    id: input.patientId,
                  },
                }
                : undefined,
            medicalRecordStatus: input.medicalRecordStatusId ? {
                connect: {
                  id: input.medicalRecordStatusId
                }
              } : undefined,
            clinicalProvider:
              input.clinicalProviderId != null
                ? {
                  connect: {
                    id: input.clinicalProviderId,
                  },
                }
                : undefined,
            legalCase:
              input.legalCaseId != null
                ? {
                  connect: {
                    id: input.legalCaseId,
                  },
                }
                : undefined,
            appointmentStatus:
              input.appointmentStatusId != null
                ? {
                  connect: {
                    id: input.appointmentStatusId,
                  },
                }
                : undefined,
            visitKind:
                input.visitKindId != null
                  ? {
                    connect: {
                      id: input.visitKindId,
                    },
                  }
                  : undefined,
            name: input.name,
            appointmentDateAndTime: input.appointmentDateAndTime,
            checkedIn: input.checkedIn,
            checkedInDateTime: input.checkedInDateTime,
            duration: input.duration,
            notes: input.notes,
            isFirstInstance: input.isFirstInstance,
            description: input.description,
            recurringEventId: input.recurringEventId,
            start: input.start,
            end: input.end,
            allDay: input.allDay,
            recurrence: input.recurrence,
            finalVisitApproved: input.finalVisitApproved,
          },
          include: {
            location: true,
            medicalReport: true,
            bill: true,
            imaging: true,
            patient: true,
            miscellaneous: true,
            clinicalProvider: {
              include: {
                clinicalProviderLocations: { include: { location: true } },
                clinicalProviderSpecialties: { include: { specialty: true } },
                profileImage: true,
                vendor: true,
              },
            },
            legalCase: true,
            appointmentStatus: true,
            visitKind: true,
            assignedTo: true,
            caseProcedures: true,
            medicalRecordStatus: true,
            claimProcedures: { include: { placeOfService: true, claimStatus: true, claim: true, appointment: true } },
          },
        })

        await this.data.logEvent(sendingUser, false, 'Appointment', 'Update', appointment)

        return appointment
      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Appointment')
    }
  }

  async userUpdateAppointments(userId: string, input: UserUpdateAppointmentsInput): Promise<UpdateResult> {
    const total = input.appointments.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.appointments) {
      const inputData = input.appointments[key]

      const data = {
        id: inputData.id,
        name: inputData.name,
        appointmentDateAndTime: inputData.appointmentDateAndTime,
        locationId: inputData.locationId,
        checkedIn: inputData.checkedIn,
        checkedInDateTime: inputData.checkedInDateTime,
        medicalReportId: inputData.medicalReportId,
        miscellaneousId: inputData.miscellaneousId,
        billId: inputData.billId,
        imagingId: inputData.imagingId,
        duration: inputData.duration,
        patientId: inputData.patientId,
        clinicalProviderId: inputData.clinicalProviderId,
        legalCaseId: inputData.legalCaseId,
        appointmentStatusId: inputData.appointmentStatusId,
        visitKindId: inputData.visitKindId,
        notes: inputData.notes,
        recurringEventId: inputData.recurringEventId,
        isFirstInstance: inputData.isFirstInstance,
        description: inputData.description,
        start: inputData.start,
        end: inputData.end,
        allDay: inputData.allDay,
        recurrence: inputData.recurrence,
        finalVisitApproved: inputData.finalVisitApproved ,
      }

      const appointmentData = await this.checkAppointmentExist(
        inputData.name,
        inputData.patientId,
        inputData.legalCaseId,
      )

      if (appointmentData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.appointment.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }

  async userDeleteAppointment(userId: string, appointmentId: string) {
    const sendingUser = await this.data.user.findFirst({ where: { id: userId } })

    try {
      if (!appointmentId) {
        throw new BadRequestException('Appointment Id is required')
      } else {
        const caseProcedureCount = await this.data.caseProcedure.count({ where: { appointmentId: appointmentId } })
        if (caseProcedureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Procedure')
        }

        const claimProcedureCount = await this.data.claimProcedure.count({ where: { appointmentId: appointmentId } })
        if (claimProcedureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Claim Procedure')
        }

        await this.data.logEvent(sendingUser, true, 'Appointment', 'Delete', appointmentId)

        const appointment = this.data.appointment.delete({
          where: { id: appointmentId },
        })

        await this.data.logEvent(sendingUser, false, 'Appointment', 'Delete', appointment)

        return appointment
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }

      throw new InternalServerErrorException('Error in deleting Appointment')
    }
  
  }
}
