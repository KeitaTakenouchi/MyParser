"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Lexer 
const types_1 = require("./types");
class Scanner {
    constructor(souceCode) {
        this.line = 1;
        this.souce = souceCode;
        this.pos = 0;
    }
    // Return undefined if scanning is over.
    scan() {
        // skip white spaces
        while (!this.isEnd() && this.isSpace())
            this.next();
        if (this.isEnd())
            return undefined;
        let start = this.pos;
        let kind;
        switch (this.current()) {
            case "{":
                kind = "OpenBraceToken" /* OpenBraceToken */;
                this.next();
                break;
            case "}":
                this.next();
                kind = "CloseBraceToken" /* CloseBraceToken */;
                break;
            case "(":
                this.next();
                kind = "OpenParenToken" /* OpenParenToken */;
                break;
            case ")":
                this.next();
                kind = "CloseParenToken" /* CloseParenToken */;
                break;
            case "[":
                this.next();
                kind = "OpenBracketToken" /* OpenBracketToken */;
                break;
            case "]":
                this.next();
                kind = "CloseBracketToken" /* CloseBracketToken */;
                break;
            case "=":
                this.next();
                kind = "EqualsToken" /* EqualsToken */;
                break;
            case ";":
                this.next();
                kind = "SemicolonToken" /* SemicolonToken */;
                break;
            case ",":
                this.next();
                kind = "CommaToken" /* CommaToken */;
                break;
            case "+":
                this.next();
                kind = "PlusToken" /* PlusToken */;
                break;
            case "-":
                this.next();
                kind = "MinusToken" /* MinusToken */;
                break;
            case "*":
                this.next();
                kind = "AsteriskToken" /* AsteriskToken */;
                break;
            case "<":
                this.next();
                kind = "LessThanToken" /* LessThanToken */;
                break;
            case ">":
                this.next();
                kind = "GreaterThanToken" /* GreaterThanToken */;
                break;
            case "\"":
                this.next();
                while (!this.isEnd() && this.current() != "\"")
                    this.next();
                this.next(); // consume the second "
                kind = "StringLiteral" /* StringLiteral */;
                break;
            default:
                if (this.isAlphabet()) {
                    this.next();
                    while (!this.isEnd() && (this.isAlphabet() || this.isNumeric()))
                        this.next();
                    // check keywords
                    let word = this.souce.substring(start, this.pos);
                    kind = "Identifier" /* Identifier */;
                    switch (word) {
                        case "var":
                            kind = "VarKeyword" /* VarKeyword */;
                            break;
                        case "if":
                            kind = "IfKeyword" /* IfKeyword */;
                            break;
                        case "else":
                            kind = "ElseKeyword" /* ElseKeyword */;
                            break;
                        case "return":
                            kind = "ReturnKeyword" /* ReturnKeyword */;
                            break;
                        case "while":
                            kind = "WhileKeyword" /* WhileKeyword */;
                            break;
                        case "for":
                            kind = "ForKeyword" /* ForKeyword */;
                            break;
                    }
                }
                else if (this.isNumeric()) {
                    this.next();
                    while (!this.isEnd() && this.isNumeric())
                        this.next();
                    if (this.isAlphabet())
                        this.throwSyntaxError();
                    kind = "NumericLiteral" /* NumericLiteral */;
                }
                else {
                    this.throwSyntaxError();
                }
                break;
        }
        let code = this.souce.substring(start, this.pos);
        return new types_1.Token(kind, code, this.line);
    }
    throwSyntaxError() {
        throw { message: "Syntax Error at line:" + this.line };
    }
    isSpace() {
        let c = this.current();
        return c == " "
            || c == "\t"
            || c == "\n"
            || c == "\r";
    }
    isAlphabet() {
        let code = this.current().charCodeAt(0);
        return (code >= 0x0041 && code <= 0x005A)
            || (code >= 0x0061 && code <= 0x007A);
    }
    isNumeric() {
        let code = this.current().charCodeAt(0);
        return (code >= 0x0030 && code <= 0x0039);
    }
    isEnd() {
        return this.pos >= this.souce.length;
    }
    next() {
        if (this.current() == "\n")
            this.line++;
        this.pos++;
        return this.current();
    }
    current() {
        return this.souce.charAt(this.pos);
    }
}
exports.Scanner = Scanner;
//# sourceMappingURL=scanner.js.map