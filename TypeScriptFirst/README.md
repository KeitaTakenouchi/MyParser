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
    	function_definition
		| variable_definition
		| array_definition

	function_definition	:=
	    function_name '(' [ parameter {',' parameter}* ] ')'  compound_statement

	variable_definition :=
		VAR	variable_name ['=' expr] ';'

    array_definition :=
    	VAR array_reference ';'	

	compound_statement:= 
		 '{' [local_variable_declaration] {statement}* '}'

	local_variable_declaration: = 
		VAR variable_name [ {',' variable_name}* ] ';'

	statement :=
    	assignment_statement
		| compound_statement
		| if_statement
		| return_statement
		| while_statement
		| for_statement
		| print

    assignment_statement := 
          assignment ';'

    if_statement :=		  
          IF '(' expr ')' statement [ ELSE statement ]

    return_statement :=
          RETURN [expr] ';'

    while_statement :=
          WHILE '(' expr ')' statement	
		  
    for_statement :=
          FOR '(' expr ';' expr ';' assignment ')' statement	

    assignment :=
          variable_assignment
        | array_assignment

    variable_assignment :=
          variable_name '=' expr

    array_assignment :=
          array_reference '=' expr	

	expr:= 	 
		  primary_expr
		| arith_expr

	primary_expr:=
		  variable_name
		| number
		| STRING
		| array_reference
		| function_call
		| function_call_without_args
		| paren_expr 

    array_reference :=
          array_name '[' expr ']'

    function_call := 
          function_name '(' expr [{',' expr}*] ')'

    function_call_without_args := 
	      function_name '(' ')'

    paren_expr :=
          '(' expr ')'

    print :=
        PRINTLN  '(' STRING ',' expr ')'

	arith_expr :=
          expr '+' expr
		| expr '-' expr
		| expr '*' expr
		| expr '<' expr
		| expr '>' expr	

--


	number:= (digit) {0|digit}*

	digit:= 1|..| 9

	string:= '"' char {char|number}* '"'

	char:= a|b|..|z|A|B|..|Z

## Sample code
	main()
	{
	    var i,s;
	    s = 0;
	    i = 0; 
	    while(i < 10){
	      	s = s + i;
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