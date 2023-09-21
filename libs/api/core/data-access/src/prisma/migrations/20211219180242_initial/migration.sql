-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__User__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF__User__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [developer] BIT NOT NULL CONSTRAINT [DF__User__developer] DEFAULT 0,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000),
    [firstName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [avatarUrl] NVARCHAR(1000),
    [location] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    [bio] NVARCHAR(1000),
    [line1] NVARCHAR(1000),
    [line2] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [postalCode] NVARCHAR(1000),
    [slug] NVARCHAR(1000),
    [dateOfBirth] DATETIME2,
    [cellPhone] NVARCHAR(1000),
    [education] NVARCHAR(1000),
    [weatherZip] NVARCHAR(1000),
    [genderId] NVARCHAR(1000),
    CONSTRAINT [PK__User__id] PRIMARY KEY ([id]),
    CONSTRAINT [User_username_unique] UNIQUE ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Gender] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__Gender__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF__Gender__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PK__Gender__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Email] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__Email__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF__Email__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [isPublic] BIT NOT NULL CONSTRAINT [DF__Email__isPublic] DEFAULT 0,
    [primary] BIT NOT NULL CONSTRAINT [DF__Email__primary] DEFAULT 0,
    [verified] BIT NOT NULL CONSTRAINT [DF__Email__verified] DEFAULT 0,
    [verifyToken] NVARCHAR(1000),
    [verifyExpires] DATETIME2,
    [ownerId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PK__Email__id] PRIMARY KEY ([id]),
    CONSTRAINT [Email_email_unique] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Calendar] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__Calendar__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__Calendar__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [color] NVARCHAR(1000),
    [visible] BIT,
    [title] NVARCHAR(1000),
    [calendarDrawerMode] NVARCHAR(1000),
    [calendarEventEditMode] NVARCHAR(1000),
    [calendarEventPanelMode] NVARCHAR(1000),
    CONSTRAINT [PK__Calendar__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CalendarWeekday] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__CalendarWeekday__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF__CalendarWeekday__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [abbr] NVARCHAR(1000),
    [label] NVARCHAR(1000),
    [value] NVARCHAR(1000),
    CONSTRAINT [PK__CalendarWeekday__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Contact] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__Contact__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__Contact__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [firstName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [suffix] NVARCHAR(1000),
    [primaryPhoneNumber] NVARCHAR(1000),
    [primaryEmailAddress] NVARCHAR(1000),
    [primaryAddressLine1] NVARCHAR(1000),
    [primaryAddressLine2] NVARCHAR(1000),
    [primaryAddressCity] NVARCHAR(1000),
    [primaryAddressStateOrProvince] NVARCHAR(1000),
    [primaryAddressPostalCode] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [dateOfBirth] DATETIME2,
    CONSTRAINT [PK__Contact__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Document] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__Document__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__Document__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [attachment] NVARCHAR(1000),
    [encoding] NVARCHAR(1000),
    [extension] NVARCHAR(1000),
    CONSTRAINT [PK__Document__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__Role__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__Role__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PK__Role__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Setting] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__Setting__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__Setting__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [dateFormat] NVARCHAR(1000),
    [timeFormat] NVARCHAR(1000),
    [startWeekOn] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    CONSTRAINT [PK__Setting__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Team] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__Team__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__Team__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PK__Team__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TeamUser] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__TeamUser__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__TeamUser__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    [teamId] NVARCHAR(1000),
    [teamRoleId] NVARCHAR(1000),
    CONSTRAINT [PK__TeamUser__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserCalendar] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__UserCalendar__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__UserCalendar__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [calendarTypeId] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    [teamId] NVARCHAR(1000),
    [calendarId] NVARCHAR(1000),
    CONSTRAINT [PK__UserCalendar__id] PRIMARY KEY ([id]),
    CONSTRAINT [UserCalendar_teamId_unique] UNIQUE ([teamId]),
    CONSTRAINT [UserCalendar_calendarId_unique] UNIQUE ([calendarId])
);

-- CreateTable
CREATE TABLE [dbo].[UserRole] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__UserRole__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__UserRole__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [roleId] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    CONSTRAINT [PK__UserRole__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Appointment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__Appointment__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__Appointment__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [appointmentStatusId] NVARCHAR(1000),
    [appointmentDateAndTime] DATETIME2,
    [locationName] NVARCHAR(1000),
    [line1] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [postalCode] NVARCHAR(1000),
    [checkedIn] BIT,
    [checkedInDateTime] DATETIME2,
    [latitude] FLOAT(53),
    [longitude] FLOAT(53),
    [medicalReportUrl] NVARCHAR(1000),
    [billUrl] NVARCHAR(1000),
    [duration] INT,
    [notes] NVARCHAR(1000),
    [recurringEventId] NVARCHAR(1000),
    [isFirstInstance] BIT,
    [description] NVARCHAR(1000),
    [start] NVARCHAR(1000),
    [end] NVARCHAR(1000),
    [allDay] BIT,
    [recurrence] NVARCHAR(1000),
    CONSTRAINT [PK__Appointment__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AppointmentStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__AppointmentStatus__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__AppointmentStatus__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PK__AppointmentStatus__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Task] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__Task__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__Task__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [appointmentId] NVARCHAR(1000),
    CONSTRAINT [PK__Task__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CalendarType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__CalendarType__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__CalendarType__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PK__CalendarType__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TaskItem] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__TaskItem__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__TaskItem__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [assignedToId] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [dueDate] DATETIME2,
    [assignedDate] DATETIME2,
    [completedOn] DATETIME2,
    [completed] BIT,
    [completionNotes] NVARCHAR(1000),
    CONSTRAINT [PK__TaskItem__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TeamRole] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DF__TeamRole__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DF__TeamRole__updatedAt] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PK__TeamRole__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_Appointment_calendars] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_Appointment_calendars_AB_unique] UNIQUE ([A],[B])
);

-- CreateIndex
CREATE INDEX [_Appointment_calendars_B_index] ON [dbo].[_Appointment_calendars]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [FK__User__genderId] FOREIGN KEY ([genderId]) REFERENCES [dbo].[Gender]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Email] ADD CONSTRAINT [FK__Email__ownerId] FOREIGN KEY ([ownerId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Setting] ADD CONSTRAINT [FK__Setting__userId] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TeamUser] ADD CONSTRAINT [FK__TeamUser__teamRoleId] FOREIGN KEY ([teamRoleId]) REFERENCES [dbo].[TeamRole]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TeamUser] ADD CONSTRAINT [FK__TeamUser__userId] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TeamUser] ADD CONSTRAINT [FK__TeamUser__teamId] FOREIGN KEY ([teamId]) REFERENCES [dbo].[Team]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCalendar] ADD CONSTRAINT [FK__UserCalendar__calendarTypeId] FOREIGN KEY ([calendarTypeId]) REFERENCES [dbo].[CalendarType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCalendar] ADD CONSTRAINT [FK__UserCalendar__userId] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCalendar] ADD CONSTRAINT [FK__UserCalendar__teamId] FOREIGN KEY ([teamId]) REFERENCES [dbo].[Team]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCalendar] ADD CONSTRAINT [FK__UserCalendar__calendarId] FOREIGN KEY ([calendarId]) REFERENCES [dbo].[Calendar]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT [FK__UserRole__roleId] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT [FK__UserRole__userId] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [FK__Appointment__appointmentStatusId] FOREIGN KEY ([appointmentStatusId]) REFERENCES [dbo].[AppointmentStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Task] ADD CONSTRAINT [FK__Task__appointmentId] FOREIGN KEY ([appointmentId]) REFERENCES [dbo].[Appointment]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItem] ADD CONSTRAINT [FK__TaskItem__assignedToId] FOREIGN KEY ([assignedToId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_Appointment_calendars] ADD CONSTRAINT [FK___Appointment_calendars__A] FOREIGN KEY ([A]) REFERENCES [dbo].[Appointment]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_Appointment_calendars] ADD CONSTRAINT [FK___Appointment_calendars__B] FOREIGN KEY ([B]) REFERENCES [dbo].[Calendar]([id]) ON DELETE CASCADE ON UPDATE CASCADE;
