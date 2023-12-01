-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NoteTags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tagId" INTEGER NOT NULL,
    "noteId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "NoteTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NoteTags_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NoteTags" ("id", "noteId", "tagId") SELECT "id", "noteId", "tagId" FROM "NoteTags";
DROP TABLE "NoteTags";
ALTER TABLE "new_NoteTags" RENAME TO "NoteTags";
CREATE INDEX "NoteTags_tagId_noteId_idx" ON "NoteTags"("tagId", "noteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
