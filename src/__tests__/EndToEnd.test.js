import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('show/hide an event details', () => {
    let browser;
    let page;


    beforeAll(async () => {
        console.log('Запуск браузера...');
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 0
        });
        page = await browser.newPage();
        console.log('Открытие страницы...');
        await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    });


    afterAll(async () => {
        console.log('Закрытие браузера...');
        await browser.close();
    });


    test('An event element is collapsed by default', async () => {
        console.log('Ожидание появления элемента события...');
        await page.waitForSelector('.eventSummary', { timeout: 20000 });
        const eventDetails = await page.$('.eventDetails');
        expect(eventDetails).toBeNull();
    });


    test('User can expand an event to see its details', async () => {
        console.log('Нажимаем на кнопку для показа деталей...');
        await page.click('.show-details-btn');
        const eventDetails = await page.$('.eventDetails');
        expect(eventDetails).toBeDefined();
    });


    test('User can collapse an event to hide details', async () => {
        console.log('Нажимаем на кнопку для скрытия деталей...');
        await page.click('.show-details-btn');
        const eventDetails = await page.$('.eventDetails');
        expect(eventDetails).toBeNull();
    });
});