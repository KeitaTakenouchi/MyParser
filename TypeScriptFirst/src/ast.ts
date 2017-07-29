import * as t from "./types";
import { Lexer } from "./lexer";
import { Token } from "./types";


export class AST
{
    root: t.ASTNode;
    constructor(root: t.ASTNode)
    {
        this.root = root;
    }
}

// Parser
export class AstFactory
{
    private tokens: Token[];
    private pos: number = 0;

    create(sourceCode: string): AST
    {
        this.tokens = new Lexer(sourceCode).tokenize();
        let root = this.parseProgram();
        return new AST(root);
    }

    private parseProgram(): t.ProgramNode
    {
        let node = new t.ProgramNode();
        node.parent = null;

        for (let i = 0; ; i++)
        {
            let childNode = this.parseExternalDefinition();
            if (childNode == null) break;
            childNode.parent = node;
            node.children[i] = childNode;
        }
        return node;
    }

    private parseExternalDefinition(): t.ExternalDefinitionNode
    {
        return this.parseFunctionDefinition()
            || this.parseVariableDefinition()
            || this.parseArrayDefinition();
    }

    private parseFunctionDefinition(): t.FunctionDefinitionNode
    {
        let tmpPos = this.pos;
        let funcNameNode: t.IdentifierNode,
            params: t.IdentifierNode[] = [],
            compoundStmt: t.CompoundStatementNode;

        if ((funcNameNode = this.parseIdentifier())
            && (this.expectKeyword(t.TokenKind.OpenParenToken)))
        {
            // optional
            let c = this.parseIdentifier();
            if (c != null)
            {
                params.push(c);
                for (; ;)
                {
                    c = null;
                    (this.expectKeyword(t.TokenKind.CommaToken))
                        && (c = this.parseIdentifier())
                    if (c == null) break;
                    params.push(c);
                }
            }

            if ((this.expectKeyword(t.TokenKind.CloseParenToken))
                && (compoundStmt = this.parseCompoundStatement()))
            {
                let node = new t.FunctionDefinitionNode();
                this.connectNodes(node, 0, funcNameNode);
                this.connectNodes(node, 1, compoundStmt);
                for (let i = 0; i < params.length; i++)
                    this.connectNodes(node, i + 2, params[i]);
                return node;
            }
        }
        else
        {
            this.backTrack(tmpPos);
            return null;
        }
    }


    private parseVariableDefinition(): t.VariableDefinitionNode
    {
        let tmpPos = this.pos;
        let varNameNode: t.IdentifierNode,
            exprNode: t.ExpressionNode;

        if ((this.expectKeyword(t.TokenKind.VarKeyword))
            && (varNameNode = this.parseIdentifier()))
        {
            // optional
            (this.expectKeyword(t.TokenKind.EqualsToken))
                && (exprNode = this.parseExpression())

            if (this.expectKeyword(t.TokenKind.SemicolonToken))
            {
                let node = new t.VariableAssignmentNode();
                this.connectNodes(node, 0, varNameNode);
                this.connectNodes(node, 1, exprNode);
                return node;
            }
        }
        else
        {
            this.backTrack(tmpPos);
            return null;
        }
    }

    private parseArrayDefinition(): t.ArrayDefinitionNode
    {
        let tmpPos = this.pos;
        let arrayRefNode: t.ArrayReferenceNode;

        if ((this.expectKeyword(t.TokenKind.VarKeyword))
            && (arrayRefNode = this.parseArrayReference())
            && (this.expectKeyword(t.TokenKind.SemicolonToken)))
        {
            let node = new t.ArrayDefinitionNode();
            this.connectNodes(node, 0, arrayRefNode);
            return node;
        }
        else
        {
            this.backTrack(tmpPos);
            return null;
        }
    }

    private parseCompoundStatement(): t.CompoundStatementNode
    {
        let tmpPos = this.pos;
        let localVarDeclNode: t.LocalVariableDeclarationNode,
            statements: t.StatementNode[] = [];

        if (this.expectKeyword(t.TokenKind.OpenBraceToken))
        {
            // optional
            localVarDeclNode = this.parseLocalVariableDeclaration();
            for (; ;)
            {
                let c = this.parseStatement();
                if (c == null) break;
                statements.push(c);
            }

            if (this.expectKeyword(t.TokenKind.CloseBraceToken))
            {
                let node = new t.CompoundStatementNode();
                this.connectNodes(node, 0, localVarDeclNode);
                for (let i = 0; i < statements.length; i++)
                    this.connectNodes(node, i + 1, statements[i]);
                return node;
            }
        }
        else
        {
            this.backTrack(tmpPos);
            return null;
        }
    }

    private parseLocalVariableDeclaration(): t.LocalVariableDeclarationNode
    {
        return null;
    }

    private parseStatement(): t.StatementNode
    {
        return null;
    }

    private parseAssignmentStatement(): t.AssignmentNode
    {
        return null;
    }

    private parseIfStatement(): t.IfStatementNode
    {
        return null;
    }

    private parseReturnStatement(): t.ReturnStatementNode
    {
        return null;
    }

    private parseWhileStatement(): t.WhileStatementNode
    {
        return null;
    }

    private parseForStatement(): t.ForStatementNode
    {
        return null;
    }

    private parsePrint(): t.PrintNode
    {
        return null;
    }

    private parseAssignment(): t.AssignmentNode
    {
        return null;
    }

    private parseVariableAssignment(): t.VariableAssignmentNode
    {
        return null;
    }

    private parseArrayAssignment(): t.ArrayAssignmentNode
    {
        return null;
    }

    private parseExpression(): t.ExpressionNode
    {
        return null;
    }

    private parseArithExpression(): t.ArithExpressionNode
    {
        return null;
    }

    private parseIdentifier(): t.IdentifierNode
    {
        return null;
    }

    private parseNumericLiteral(): t.NumericLiteralNode
    {
        return null;
    }

    private parseStringLiteral(): t.StringLiteralNode
    {
        return null;
    }

    private parseArrayReference(): t.ArrayReferenceNode
    {
        return null;
    }

    private parseFunctionCall(): t.FunctionCallNode
    {
        return null;
    }

    private parseFunctionCallWithoutArgs(): t.FunctionCallWithoutArgsNode
    {
        return null;
    }

    private parseParenExpression(): t.ParenExpressionNode
    {
        return null;
    }

    private parseSum(): t.SumNode
    {
        return null;
    }

    private parseMinus(): t.MinusNode
    {
        return null;
    }

    private parseMult(): t.MultNode
    {
        return null;
    }

    private parseLessThan(): t.LessThanNode
    {
        return null;
    }

    private parseGreaterThan(): t.GreaterThanNode
    {
        return null;
    }

    private expectKeyword(kind: t.TokenKind): boolean
    {
        let b = (this.current().kind == kind);
        if (b) this.next();
        return b;
    }

    private connectNodes(parent: t.ASTNode, i, child: t.ASTNode): void
    {
        parent.children[i] = child;
        child.parent = parent;
    }

    private backTrack(pos: number): boolean
    {
        this.pos = pos;
        return true;
    }

    private next(): void
    {
        this.pos++;
    }

    private current(): Token
    {
        return this.tokens[this.pos];
    }
}