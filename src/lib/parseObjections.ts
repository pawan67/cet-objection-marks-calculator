import * as cheerio from 'cheerio';

export function parseObjectionTable(htmlString: string) {
    const $ = cheerio.load(htmlString);
    const data: {
        questionId: string;
        subject: string;
        correctOption: string;
        userOption: string;
        isCorrect: boolean;
    }[] = [];

    $('#tblObjection tbody tr').each((_, row) => {
        const cells = $(row).find('td');
        if (cells.length < 3) return;

        const questionId = $(cells[0]).text().trim();
        const subject = $(cells[1]).text().trim();

        const correctOption = $(cells[2])
            .find('b:contains("Correct Option:")')
            .next('span')
            .text()
            .trim();

        const userOption = $(cells[2])
            .find('b:contains("Candidate Response:")')
            .next('span')
            .text()
            .trim();

        const isCorrect = correctOption === userOption;

        data.push({ questionId, subject, correctOption, userOption, isCorrect });
    });

    return data;
}

export function extractNameFromHTML(htmlString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const dropdownText = doc.querySelector('#navbarDropdown')?.textContent || '';

    // Example: "2502040774 - PAWAN DEVRAJ TAMADA"

    const namePart = dropdownText.split('-')[1];
    return namePart ? namePart.trim() : null;
}

export function extractRollNumberFromHTML(htmlString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const dropdownText = doc.querySelector('#navbarDropdown')?.textContent || '';

    // Example: "2502040774 - PAWAN DEVRAJ TAMADA"

    const rollNumberPart = dropdownText.split('-')[0];
    return rollNumberPart ? rollNumberPart.trim() : null;
}
