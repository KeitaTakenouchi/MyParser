import { Token, ProgramNode, StringLiteralNode, TokenKind } from "./types";
import { Lexer } from "./lexer";

    let fs = require('fs');
    let filename = "foo.tiny";
    let source: string = fs.readFileSync(filename, "UTF-8");

    try
    {
        let lexer = new Lexer(source);
        let list = lexer.tokenize();
        console.log(list);
    }
    catch (e) // catch syntax error
    {
        console.log(e.message);
    }

