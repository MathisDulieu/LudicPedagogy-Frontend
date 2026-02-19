import { test, expect } from "@playwright/test";

test.describe("Game Editor", () => {
    test("should allow scrolling in the sidebar with many questions", async ({
        page,
    }) => {
        await page.goto("/editor");

        // Click on "Nouveau Jeu" (assuming there's a button or we can click a type)
        // For now, let's assume we can trigger the QCM editor
        await page.click('button:has-text("Quiz Flash")');

        // Add 15 questions to force scrolling
        const addButton = page.locator(
            'button:has-text(" Ajouter une question")',
        );
        for (let i = 0; i < 15; i++) {
            await addButton.click();
        }

        // Check if the sidebar is scrollable
        const sidebar = page.locator(".custom-scrollbar");
        const isScrollable = await sidebar.evaluate((el) => {
            return el.scrollHeight > el.clientHeight;
        });

        expect(isScrollable).toBe(true);

        // Verify the bottom button is reachable (Enregistrer & Quitter)
        const saveButton = page.locator(
            'button:has-text("Enregistrer & Quitter")',
        );
        await expect(saveButton).toBeVisible();
    });
});
