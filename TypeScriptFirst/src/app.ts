import { Scanner } from "./scanner";
import { Token, ProgramNode, StringLiteralNode } from "./types";

    let fs = require('fs');
    let filename = "foo.tiny";
    let source: string = fs.readFileSync(filename, "UTF-8");
    let scanner = new Scanner(source);

    try
    {
        let token: Token;
        while (token = scanner.scan())
        {
            console.log(token);
        }
        console.log("TOKENIZING FINISHED.");
    }
    catch (e) // catch syntax error
    {
        console.log(e.message);
    }

    let list = ["tom", "bob", "mary"];
    let node = new StringLiteralNode();