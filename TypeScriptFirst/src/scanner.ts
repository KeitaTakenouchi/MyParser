﻿// Lexer 
import { SyntaxKind, Token } from "./types";

export class Scanner
{
    private souce: string;
    private pos: number;
    private line: number = 1;

    constructor(souceCode: string)
    {
        this.souce = souceCode;
        this.pos = 0;
    }

    // Return undefined if scanning is over.
    public scan(): Token
    {
        // skip white spaces
        while (!this.isEnd() && this.isSpace()) this.next();

        if (this.isEnd()) return undefined;

        let start = this.pos;
        let kind: SyntaxKind;

        switch (this.current())
        {
            case "{":
                kind = SyntaxKind.OpenBraceToken;
                this.next();
                break;
            case "}":
                this.next();
                kind = SyntaxKind.CloseBraceToken;
                break;
            case "(":
                this.next();
                kind = SyntaxKind.OpenParenToken;
                break;
            case ")":
                this.next();
                kind = SyntaxKind.CloseParenToken;
                break;
            case "[":
                this.next();
                kind = SyntaxKind.OpenBracketToken;
                break;
            case "]":
                this.next();
                kind = SyntaxKind.CloseBracketToken;
                break;
            case "=":
                this.next();
                kind = SyntaxKind.EqualsToken;
                break;
            case ";":
                this.next();
                kind = SyntaxKind.SemicolonToken;
                break;
            case ",":
                this.next();
                kind = SyntaxKind.CommaToken;
                break;
            case "+":
                this.next();
                kind = SyntaxKind.PlusToken;
                break;
            case "-":
                this.next();
                kind = SyntaxKind.MinusToken;
                break;
            case "*":
                this.next();
                kind = SyntaxKind.AsteriskToken;
                break;
            case "<":
                this.next();
                kind = SyntaxKind.LessThanToken;
                break;
            case ">":
                this.next();
                kind = SyntaxKind.GreaterThanToken;
                break;
            case "\"":
                this.next();
                while (!this.isEnd() && this.current() != "\"") this.next();
                this.next(); // consume the second "
                kind = SyntaxKind.StringLiteral;
                break;
            default:
                if (this.isAlphabet())
                {
                    this.next();
                    while (!this.isEnd() && (this.isAlphabet() || this.isNumeric())) this.next();

                    // check keywords
                    let word: string = this.souce.substring(start, this.pos);
                    kind = SyntaxKind.Identifier;
                    switch (word)
                    {
                        case "var":
                            kind = SyntaxKind.VarKeyword;
                            break;
                        case "if":
                            kind = SyntaxKind.IfKeyword;
                            break;
                        case "else":
                            kind = SyntaxKind.ElseKeyword;
                            break;
                        case "return":
                            kind = SyntaxKind.ReturnKeyword;
                            break;
                        case "while":
                            kind = SyntaxKind.WhileKeyword;
                            break;
                        case "for":
                            kind = SyntaxKind.ForKeyword;
                            break;
                    }
                }
                else if (this.isNumeric())
                {
                    this.next();
                    while (!this.isEnd() && this.isNumeric())this.next();
                    if (this.isAlphabet()) this.throwSyntaxError();
                    kind = SyntaxKind.NumericLiteral;
                }
                else
                {
                    this.throwSyntaxError();
                }
                break;
        }
        let code: string = this.souce.substring(start, this.pos);
        return new Token(kind, code, this.line);
    }

    private throwSyntaxError()
    {
        throw { message: "Syntax Error at line:" + this.line };
    }

    private isSpace(): boolean
    {
        let c = this.current();
        return c == " "
            || c == "\t"
            || c == "\n"
            || c == "\r"
            ;
    }

    private isAlphabet(): boolean
    {
        let code: number = this.current().charCodeAt(0);
        return (code >= 0x0041 && code <= 0x005A)
            || (code >= 0x0061 && code <= 0x007A);
    }

    private isNumeric(): boolean
    {
        let code: number = this.current().charCodeAt(0);
        return (code >= 0x0030 && code <= 0x0039);

    }

    private isEnd(): boolean
    {
        return this.pos >= this.souce.length;
    }

    private next(): string
    {
        if (this.current() == "\n") this.line++;
        this.pos++;
        return this.current();
    }

    private current(): string
    {
        return this.souce.charAt(this.pos);
    }

}