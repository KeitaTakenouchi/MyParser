namespace tiny
{
    // This is a list of token types.
    const enum SyntaxKing
    {
        // literal
        NumericLiteral,
        StringLiteral,

        // Identifiers
        Identifier,

        // keywords
        VarKeyword = "VAR",
        IfKeyword = "IF",
        ElseKeyword = "ELSE",
        ReturnKeyword = "RETURN",
        WhileKeyword = "WHILE",
        ForKeyword = "FOR",

        // tokens
        OpenBraceToken = "{",
        CloseBraceToken = "}",
        OpenParenToken = "(",
        CloseParenToken = ")",
        OpenBracketToken = "[",
        CloseBracketToken = "]",
        EqualsToken = "=",
        SemicolonToken = ";",
        CommaToken = ",",
        PlusToken = "+",
        MinusToken = "-",
        AsteriskToken = "*",
        LessThanToken = "<",
        GreaterThanToken = ">",
    }
}