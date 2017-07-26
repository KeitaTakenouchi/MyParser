import fs = require('fs');
import { Scanner } from "./scanner";
import { Token } from "./types";

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
    console.log("TOKENIZING IS OVER.");
}
catch (e)
{
    console.log(e.message);
}







