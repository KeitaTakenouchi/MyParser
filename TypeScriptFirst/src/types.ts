    // This is a enum of token types.
    export const enum TokenKind
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
        kind: TokenKind;
        line: number;

        constructor(kind: TokenKind, code: string, line: number)
        {
            this.line = line;
            this.code = code;
            this.kind = kind;
        }
    }

    export abstract class ASTNode
    {
        parent: ASTNode;
        children: ASTNode[];

        ifLeaf(): boolean
        {
            return this.children.length == 0;
        }

        // TODO : Maybe need a iterator or visitor.
    }

    // [0..n-1] : external definitions
    export class ProgramNode extends ASTNode
    {
        getExternalDefinion(): ExternalDefinitionNode[]
        {
            return this.children as ExternalDefinitionNode[];
        }
    }

    // This node is not shown in AST.
    export abstract class ExternalDefinitionNode extends ASTNode
    {

    }

    // [0] : function name
    // [1] : compound_statement
    // [2..n-1] : parameters
    export class FunctionDefinitionNode extends ExternalDefinitionNode
    {
        getFunctionName(): IdentifierNode
        {
            return this.children[0] as IdentifierNode;
        }

        getParameters(): IdentifierNode[]
        {
            let subList = this.children.slice(2, this.children.length);
            return subList as IdentifierNode[];
        }

        getCompoundStatement(): CompoundStatementNode
        {
            return this.children[1] as CompoundStatementNode;
        }
    }

    // [0] : variable name
    // [1] : expression (may be undefined)
    export class VariableDefinitionNode extends ExternalDefinitionNode
    {
        getVariableName(): IdentifierNode
        {
            return this.children[0] as IdentifierNode;
        }

        getExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }

    // [0] : array reference
    export class ArrayDefinitionNode extends ExternalDefinitionNode
    {
        getArrayName(): ArrayReferenceNode
        {
            return this.children[0] as ArrayReferenceNode;
        }
    }

    // [0] : local variable declaration (may be undefined)
    // [1..n-1] : statement
    export class CompoundStatementNode extends ASTNode
    {
        getLocalVariableDeclaration(): LocalVariableDeclarationNode
        {
            return this.children[0] as LocalVariableDeclarationNode;
        }

        getStatements(): StatementNode[]
        {
            let subList = this.children.slice(1, this.children.length);
            return subList as StatementNode[];
        }
    }

    // [0..n-1] : variable names
    export class LocalVariableDeclarationNode extends ASTNode
    {
        getVariableNames(): IdentifierNode[]
        {
            return this.children as IdentifierNode[];
        }
    }

    // This node is not shown in AST.
    export abstract class StatementNode extends ASTNode
    {
        
    }

    // [0] : assignment
    export class AssignmentStatementNode extends StatementNode
    {
        getExpression(): AssignmentNode
        {
            return this.children[0] as AssignmentNode;
        }
    }

    // [0] : expression
    // [1] : then-statement
    // [2] : else-statement (may be undefined)
    export class IfStatementNode extends StatementNode
    {
        getExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }

        getThenStatement(): StatementNode
        {
            return this.children[1] as StatementNode;
        }

        getElseStatement(): StatementNode
        {
            return this.children[2] as StatementNode;
        }
    }

    // [0] : expression
    export class ReturnStatementNode extends StatementNode
    {
        getExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }
    }

    // [0] : expression
    // [1] : statement
    export class WhileStatementNode extends StatementNode
    {
        getExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }

        getStatement(): StatementNode
        {
            return this.children[1] as StatementNode;
        }
    }

    // [0] : expression
    // [1] : expression
    // [2] : assignment
    // [3] : statement
    export class ForStatementNode extends StatementNode
    {
        getFirstExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }

        getSecondExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }

        getAssignment(): AssignmentNode
        {
            return this.children[2] as AssignmentNode;
        }

        getStatement(): StatementNode
        {
            return this.children[3] as StatementNode;
        }
    }

    // [0] : string literal
    // [1] : expression
    export class PrintNode extends StatementNode
    {
        getStringLiteral(): StringLiteralNode
        {
            return this.children[0] as StringLiteralNode;
        }

        getExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }

    // This node is not shown in AST.
    export abstract class AssignmentNode extends ASTNode
    {

    }

    // [0] : variable name
    // [1] : expression
    export class VariableAssignmentNode extends AssignmentNode
    {
        getVariableName(): IdentifierNode
        {
            return this.children[0] as IdentifierNode;
        }

        getExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }

    // [0] : array reference
    // [1] : expression
    export class ArrayAssignmentNode extends AssignmentNode
    {
        getArrayName(): ArrayReferenceNode
        {
            return this.children[0] as ArrayReferenceNode;
        }

        getRightExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }

    // This node is not shown in AST.
    export abstract class ExpressionNode extends ASTNode
    {

    }

    // This node is not shown in AST.
    export abstract class PrimaryExpressionNode extends ExpressionNode
    {

    }

    // This node is not shown in AST.
    export abstract class ArithExpressionNode extends ExpressionNode
    {

    }

    export class IdentifierNode extends PrimaryExpressionNode
    {
        name: string;
    }

    export abstract class NumericLiteralNode extends PrimaryExpressionNode
    {
        literalString: string;
    }

    export class StringLiteralNode extends PrimaryExpressionNode
    {
        literalString: string;
    }

    // [0] : array name
    // [1] : expression
    export class ArrayReferenceNode extends PrimaryExpressionNode
    {
        getArrayName(): IdentifierNode
        {
            return this.children[0] as IdentifierNode;
        }

        getExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }

    // [0] : function name
    // [1..n-1] : expression
    export class FunctionCallNode extends PrimaryExpressionNode
    {
        getFunctionName(): IdentifierNode
        {
            return this.children[0] as IdentifierNode;
        }

        getExpression(): ExpressionNode[]
        {
            let sublist = this.children.slice(1, this.children.length);
            return sublist as ExpressionNode[];
        }
    }

    // [0] : function name
    export class FunctionCallWithoutArgsNode extends PrimaryExpressionNode
    {
        getFunctionName(): IdentifierNode
        {
            return this.children[0] as IdentifierNode;
        }
    }

    // [0] : expression
    export class ParenExpressionNode extends PrimaryExpressionNode
    {
        getExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }
    }

    // [0] : left expression
    // [1] : right expression
    export class SumNode extends ArithExpressionNode
    {
        getLeftExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }

        getRightExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }

    // [0] : left expression
    // [1] : right expression
    export class MinusNode extends ArithExpressionNode
    {
        getLeftExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }

        getRightExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }

    // [0] : left expression
    // [1] : right expression
    export class MultNode extends ArithExpressionNode
    {
        getLeftExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }

        getRightExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }

    // [0] : left expression
    // [1] : right expression
    export class LessThanNode extends ArithExpressionNode
    {
        getLeftExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }

        getRightExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }

    // [0] : left expression
    // [1] : right expression
    export class GreaterThanNode extends ArithExpressionNode
    {
        getLeftExpression(): ExpressionNode
        {
            return this.children[0] as ExpressionNode;
        }

        getRightExpression(): ExpressionNode
        {
            return this.children[1] as ExpressionNode;
        }
    }
