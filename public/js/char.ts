class Char {
    constructor(ident, lamp, StrValue) {
        const position = ident; // Array of Identifiers
        const lamport = lamp;
        const value = StrValue;
    }
}

class Identifier {
    digit;
    site;
    constructor(digit: number, siteId: number) {
        this.digit = digit;
        this.site = siteId;
    }
}

function comparePosition(p1: Identifier[], p2: Identifier[]) { // identifier array
    for (let i = 0; i < Math.min(p1.length, p2.length); i++) {
        const comp = compareIdentifier(p1[i], p2[i]);
        if (comp !== 0) {
            return comp;
        }
    }
    if(p1.length < p2.length) {
        return -1;
    } else if(p1.length > p2.length) {
        return 1;
    } else {
        return 0;
    }
}

function compareIdentifier(i1: Identifier, i2: Identifier) {
    if (i1.digit < i2.digit) {
        return -1;
    } else if (i1.digit > i2.digit) {
        return 1
    } else {
        if(i1.site < i2.site) {
            return -1;
        } else if(i1.site > i2.site) {
            return 1;
        } else {
            return 0;
        }
    }
}

function generatePositionBetween(p1, p2, site) { // Positionidentifier
    const head1 = p1[0] || new Identifier(0, site);
    const head2 = p2[0] || new Identifier(256, site)
    if (head1 !== head2) {

    }
}

// generatePositionBetween(Identifier, Identifier, 0);