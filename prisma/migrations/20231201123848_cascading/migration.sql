-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NoteTags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tagId" INTEGER NOT NULL,
    "noteId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "NoteTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NoteTags_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NoteTags" ("createdAt", "id", "noteId", "tagId") SELECT "createdAt", "id", "noteId", "tagId" FROM "NoteTags";
DROP TABLE "NoteTags";
ALTER TABLE "new_NoteTags" RENAME TO "NoteTags";
CREATE INDEX "NoteTags_tagId_noteId_idx" ON "NoteTags"("tagId", "noteId");
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "groupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Note_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("createdAt", "groupId", "id", "name", "updatedAt", "userId") SELECT "createdAt", "groupId", "id", "name", "updatedAt", "userId" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE INDEX "Note_name_idx" ON "Note"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
