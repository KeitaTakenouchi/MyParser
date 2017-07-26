"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const scanner_1 = require("./scanner");
let filename = "foo.tiny";
let source = fs.readFileSync(filename, "UTF-8");
let scanner = new scanner_1.Scanner(source);
try {
    let token;
    while (token = scanner.scan()) {
        console.log(token);
    }
    console.log("TOKENIZING IS OVER.");
}
catch (e) {
    console.log(e.message);
}
//# sourceMappingURL=app.js.map