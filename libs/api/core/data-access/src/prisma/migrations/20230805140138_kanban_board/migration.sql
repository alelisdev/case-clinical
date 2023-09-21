BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Document] ADD [cardId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[Board] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Board_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Board_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [title] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [icon] NVARCHAR(1000),
    [lastActivity] NVARCHAR(1000),
    CONSTRAINT [Board_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BoardLabel] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [BoardLabel_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [BoardLabel_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [title] NVARCHAR(1000),
    [boardId] NVARCHAR(1000),
    CONSTRAINT [BoardLabel_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BoardList] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [BoardList_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [BoardList_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [title] NVARCHAR(1000),
    [position] INT,
    [boardId] NVARCHAR(1000),
    CONSTRAINT [BoardList_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BoardCard] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [BoardCard_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [BoardCard_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [title] NVARCHAR(1000),
    [position] INT,
    [description] NVARCHAR(1000),
    [dueDate] DATETIME2,
    [boardListId] NVARCHAR(1000),
    CONSTRAINT [BoardCard_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_card_users] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_card_users_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_label_cards] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_label_cards_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_card_users_B_index] ON [dbo].[_card_users]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_label_cards_B_index] ON [dbo].[_label_cards]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_cardId_fkey] FOREIGN KEY ([cardId]) REFERENCES [dbo].[BoardCard]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BoardLabel] ADD CONSTRAINT [BoardLabel_boardId_fkey] FOREIGN KEY ([boardId]) REFERENCES [dbo].[Board]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BoardList] ADD CONSTRAINT [BoardList_boardId_fkey] FOREIGN KEY ([boardId]) REFERENCES [dbo].[Board]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[BoardCard] ADD CONSTRAINT [BoardCard_boardListId_fkey] FOREIGN KEY ([boardListId]) REFERENCES [dbo].[BoardList]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_card_users] ADD CONSTRAINT [_card_users_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[BoardCard]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_card_users] ADD CONSTRAINT [_card_users_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_label_cards] ADD CONSTRAINT [_label_cards_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[BoardCard]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_label_cards] ADD CONSTRAINT [_label_cards_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[BoardLabel]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
