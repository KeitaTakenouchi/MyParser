// This is a list of token types.
export const enum SyntaxKind
{
    // Error
    IllegalToken = "IllegalToken",

    // literals
    NumericLiteral = "NumericLiteral",
    StringLiteral = "StringLiteral",

    // Identifiers
    Identifier = "Identifier",

    // keywords
    VarKeyword = "VarKeyword",
    IfKeyword = "IfKeyword",
    ElseKeyword = "ElseKeyword",
    ReturnKeyword = "ReturnKeyword",
    WhileKeyword = "WhileKeyword",
    ForKeyword = "ForKeyword",

    // tokens
    OpenBraceToken = "OpenBraceToken", // "{"
    CloseBraceToken = "CloseBraceToken", // "}"
    OpenParenToken = "OpenParenToken", // "("
    CloseParenToken = "CloseParenToken", // ")"
    OpenBracketToken = "OpenBracketToken", // "["
    CloseBracketToken = "CloseBracketToken", // "]"
    EqualsToken = "EqualsToken", // "="
    SemicolonToken = "SemicolonToken", // ";"
    CommaToken = "CommaToken", // ","
    PlusToken = "PlusToken",// "+"
    MinusToken = "MinusToken", // "-"
    AsteriskToken = "AsteriskToken", // "*"
    LessThanToken = "LessThanToken", // "<"
    GreaterThanToken = "GreaterThanToken", // ">"
}

export class Token
{
    code: string;
    kind: SyntaxKind;
    line: number;

    constructor(kind: SyntaxKind, code: string, line: number)
    {
        this.line = line;
        this.code = code;
        this.kind = kind;
    }
}

export interface ASTNode
{
    king: SyntaxKind;
    parent: ASTNode;
    children: ASTNode;
}

export interface Program extends ASTNode
{

}
