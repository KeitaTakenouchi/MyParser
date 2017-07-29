import { Token, TokenKind } from "./types";

// Lexer
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
        let kind: TokenKind;

        switch (this.current())
        {
            case "{":
                kind = TokenKind.OpenBraceToken;
                this.next();
                break;
            case "}":
                this.next();
                kind = TokenKind.CloseBraceToken;
                break;
            case "(":
                this.next();
                kind = TokenKind.OpenParenToken;
                break;
            case ")":
                this.next();
                kind = TokenKind.CloseParenToken;
                break;
            case "[":
                this.next();
                kind = TokenKind.OpenBracketToken;
                break;
            case "]":
                this.next();
                kind = TokenKind.CloseBracketToken;
                break;
            case "=":
                this.next();
                kind = TokenKind.EqualsToken;
                break;
            case ";":
                this.next();
                kind = TokenKind.SemicolonToken;
                break;
            case ",":
                this.next();
                kind = TokenKind.CommaToken;
                break;
            case "+":
                this.next();
                kind = TokenKind.PlusToken;
                break;
            case "-":
                this.next();
                kind = TokenKind.MinusToken;
                break;
            case "*":
                this.next();
                kind = TokenKind.AsteriskToken;
                break;
            case "<":
                this.next();
                kind = TokenKind.LessThanToken;
                break;
            case ">":
                this.next();
                kind = TokenKind.GreaterThanToken;
                break;
            case "\"":
                this.next();
                while (!this.isEnd() && this.current() != "\"") this.next();
                this.next(); // consume the second "
                kind = TokenKind.StringLiteral;
                break;
            default:
                if (this.isAlphabet())
                {
                    this.next();
                    while (!this.isEnd() && (this.isAlphabet() || this.isNumeric())) this.next();

                    // check keywords
                    let word: string = this.souce.substring(start, this.pos);
                    kind = TokenKind.Identifier;
                    switch (word)
                    {
                        case "var":
                            kind = TokenKind.VarKeyword;
                            break;
                        case "if":
                            kind = TokenKind.IfKeyword;
                            break;
                        case "else":
                            kind = TokenKind.ElseKeyword;
                            break;
                        case "return":
                            kind = TokenKind.ReturnKeyword;
                            break;
                        case "while":
                            kind = TokenKind.WhileKeyword;
                            break;
                        case "for":
                            kind = TokenKind.ForKeyword;
                            break;
                    }
                }
                else if (this.isNumeric())
                {
                    this.next();
                    while (!this.isEnd() && this.isNumeric()) this.next();
                    if (this.isAlphabet()) this.throwSyntaxError();
                    kind = TokenKind.NumericLiteral;
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

