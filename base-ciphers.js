/**
 * Gematria-Style Ciphers
 * * This file contains logic for ciphers based on multiplying the letter's
 * position by a specific base number.
 * - Base 6 Cipher: A=6, B=12, C=18...
 * - Base 3 Cipher: A=3, B=6, C=9...
 * - Base 9 Cipher: A=9, B=18, C=27...
 */
const GematriaCiphers = {
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',

    /**
     * A generic encoder that multiplies letter position by a given base.
     * @param {string} plainText The text to encode.
     * @param {number} base The base number to multiply by (e.g., 6).
     * @returns {string} The encoded string of numbers.
     */
    _encode: function(plainText, base) {
        const upperText = plainText.toUpperCase().replace(/[^A-Z]/g, '');
        let result = [];
        for (let char of upperText) {
            const index = this.alphabet.indexOf(char);
            if (index !== -1) {
                result.push((index + 1) * base);
            }
        }
        return result.join(' ');
    },

    /**
     * A generic decoder that divides a number by a base to find the letter.
     * @param {string} numString The string of space-separated numbers.
     * @param {number} base The base number to divide by.
     * @returns {string} The decoded plain text.
     */
    _decode: function(numString, base) {
        const numbers = numString.trim().split(/\s+/).map(Number);
        let result = '';
        for (let num of numbers) {
            if (num > 0 && num % base === 0) {
                const index = (num / base) - 1;
                if (index >= 0 && index < 26) {
                    result += this.alphabet[index];
                }
            }
        }
        return result;
    },
    
    /**
     * A generic reverse encoder using a reversed alphabet.
     * @param {string} plainText The text to encode.
     * @param {number} base The base number to multiply by.
     * @returns {string} The encoded string of numbers.
     */
    _reverseEncode: function(plainText, base) {
        const reversedAlphabet = this.alphabet.split('').reverse().join('');
        const upperText = plainText.toUpperCase().replace(/[^A-Z]/g, '');
        let result = [];
        for (let char of upperText) {
            const index = reversedAlphabet.indexOf(char);
            if (index !== -1) {
                result.push((index + 1) * base);
            }
        }
        return result.join(' ');
    },
    
    /**
     * A generic reverse decoder using a reversed alphabet.
     * @param {string} numString The string of space-separated numbers.
     * @param {number} base The base number to divide by.
     * @returns {string} The decoded plain text.
     */
    _reverseDecode: function(numString, base) {
        const reversedAlphabet = this.alphabet.split('').reverse().join('');
        const numbers = numString.trim().split(/\s+/).map(Number);
        let result = '';
        for (let num of numbers) {
            if (num > 0 && num % base === 0) {
                const index = (num / base) - 1;
                if (index >= 0 && index < 26) {
                    result += reversedAlphabet[index];
                }
            }
        }
        return result;
    },

    // --- Base 6 ---
    base6Encode: (text) => GematriaCiphers._encode(text, 6),
    base6Decode: (text) => GematriaCiphers._decode(text, 6),
    reverseBase6Encode: (text) => GematriaCiphers._reverseEncode(text, 6),
    reverseBase6Decode: (text) => GematriaCiphers._reverseDecode(text, 6),

    // --- Base 3 ---
    base3Encode: (text) => GematriaCiphers._encode(text, 3),
    base3Decode: (text) => GematriaCiphers._decode(text, 3),
    reverseBase3Encode: (text) => GematriaCiphers._reverseEncode(text, 3),
    reverseBase3Decode: (text) => GematriaCiphers._reverseDecode(text, 3),

    // --- Base 9 ---
    base9Encode: (text) => GematriaCiphers._encode(text, 9),
    base9Decode: (text) => GematriaCiphers._decode(text, 9),
    reverseBase9Encode: (text) => GematriaCiphers._reverseEncode(text, 9),
    reverseBase9Decode: (text) => GematriaCiphers._reverseDecode(text, 9),
};

