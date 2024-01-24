interface ParserResult {
    entity: string,
    position: number
};

function skipDelimiter(text: string, startPosition: number, endPosition: number): ParserResult {
    const DEFAULT_DELIMITER = ' ';
    const delimiters = new Set([DEFAULT_DELIMITER, '\t', '\'', '"']);
    endPosition = Math.min(endPosition, text.length);
    let currentPosition = Math.min(startPosition, endPosition);
    while (currentPosition < endPosition && delimiters.has(text[currentPosition])) {
        currentPosition++;
    }
    const delimiter = text[Math.max(currentPosition - 1, startPosition)];
    return { entity: delimiters.has(delimiter) ? delimiter : DEFAULT_DELIMITER, position: currentPosition };
}

function readIdentifier(text: string, delimiter: string, startPosition: number, endPosition: number): ParserResult {
    endPosition = Math.min(endPosition, text.length);
    let currentPosition = Math.min(startPosition, endPosition);
    while (currentPosition < endPosition && text[currentPosition] !== delimiter) {
        currentPosition++;
    }
    return { entity: text.substring(startPosition, currentPosition), position: currentPosition };
}

export function* getNextHost(text: string) {
    let currentPosition = 0;
    const processing = text.trim();
    while (currentPosition < processing.length) {
        const delimiterInfo = skipDelimiter(processing, currentPosition, processing.length);

        const identifierInfo = readIdentifier(processing, delimiterInfo.entity, delimiterInfo.position, processing.length);
        currentPosition = identifierInfo.position;
        if (identifierInfo.entity) {
            yield identifierInfo.entity;
        }
    }
}
