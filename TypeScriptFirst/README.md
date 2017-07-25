## Abstract
This is a Implementation of Recursive Descent Parser in Typescript.

## Target Syntax
The target language is Tiny-C.
The detail is written in 
http://www.hpcs.cs.tsukuba.ac.jp/~msato/lecture-note/comp-lecture/tiny-c-note1.html

## Symtax
The syntax is shown below as BNF.

    program ::=  {external_definition}*
    external_definition:= 
	    function_name '(' [ parameter {',' parameter}* ] ')'  compound_statement
		| VAR variable_name ['=' expr] ';'
		| VAR array_name '[' expr ']' ';'

	compound_statement:= 
		 '{' [local_variable_declaration] {statement}* '}'

	local_variable_declaration: = 
		VAR variable_name [ {',' variable_name}* ] ';'

	statement :=
		 expr ';'
		| compound_statement
		| IF '(' expr ')' statement [ ELSE statement ]
		| RETURN [expr] ';'
		| WHILE '(' expr ')' statement
		| FOR '(' expr ';' expr ';' expr ')' statement

	expr:= 	 
		  primary_expr
		| variable_name '=' expr
		| array_name '[' expr ']' '=' expr
		| expr '+' expr
		| expr '-' expr
		| expr '*' expr
		| expr '<' expr
		| expr '>' expr

	primary_expr:=
		  variable_name
		| number
		| STRING
		| array_name '[' expr ']'
		| function_name '(' expr [{',' expr}*] ')'
		| function_name '(' ')'
		| '(' expr ')'
		| PRINTLN  '(' STRING ',' expr ')'

--

	number:= (digit) {0|digit}*

	digit:= 1|..| 9

	string:= '"' char {char}* '"'

	char:= a|b|..|z|A|B|..|Z

## Sample code
	main()
	{
	    var i,s;
	    s = 0;
	    i = 0; 
	    while(i < 10){
	    	    s =	s +	i;
		    i = i + 1;
	    }
	    println("s = %d",s);
	}

--

	var A[10];
	main()
	{
	    var i;
	    for(i = 0; i < 10; i = i + 1) A[i] = i;
	    println("s = %d",arraySum(A,10));
	}
	arraySum(a,n)
	{
	    var i,s;
	    s = 0;
	    for(i = 0; i < 10; i = i + 1) s = s + a[i];
	    return s;
	}