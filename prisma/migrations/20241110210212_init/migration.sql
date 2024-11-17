-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailVerificationCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailVerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" BOOLEAN DEFAULT false,
    "picture" TEXT,
    "githubId" INTEGER,
    "walletAddress" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dApp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "smartContract" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "smartContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Components" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "components" TEXT[],

    CONSTRAINT "Components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectTodApp" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectTosmartContract" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ComponentsTodApp" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ComponentsTosmartContract" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripe_customer_id_key" ON "User"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripe_subscription_id_key" ON "User"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectTodApp_AB_unique" ON "_ProjectTodApp"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectTodApp_B_index" ON "_ProjectTodApp"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectTosmartContract_AB_unique" ON "_ProjectTosmartContract"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectTosmartContract_B_index" ON "_ProjectTosmartContract"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ComponentsTodApp_AB_unique" ON "_ComponentsTodApp"("A", "B");

-- CreateIndex
CREATE INDEX "_ComponentsTodApp_B_index" ON "_ComponentsTodApp"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ComponentsTosmartContract_AB_unique" ON "_ComponentsTosmartContract"("A", "B");

-- CreateIndex
CREATE INDEX "_ComponentsTosmartContract_B_index" ON "_ComponentsTosmartContract"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailVerificationCode" ADD CONSTRAINT "EmailVerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTodApp" ADD CONSTRAINT "_ProjectTodApp_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTodApp" ADD CONSTRAINT "_ProjectTodApp_B_fkey" FOREIGN KEY ("B") REFERENCES "dApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTosmartContract" ADD CONSTRAINT "_ProjectTosmartContract_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTosmartContract" ADD CONSTRAINT "_ProjectTosmartContract_B_fkey" FOREIGN KEY ("B") REFERENCES "smartContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComponentsTodApp" ADD CONSTRAINT "_ComponentsTodApp_A_fkey" FOREIGN KEY ("A") REFERENCES "Components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComponentsTodApp" ADD CONSTRAINT "_ComponentsTodApp_B_fkey" FOREIGN KEY ("B") REFERENCES "dApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComponentsTosmartContract" ADD CONSTRAINT "_ComponentsTosmartContract_A_fkey" FOREIGN KEY ("A") REFERENCES "Components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComponentsTosmartContract" ADD CONSTRAINT "_ComponentsTosmartContract_B_fkey" FOREIGN KEY ("B") REFERENCES "smartContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
