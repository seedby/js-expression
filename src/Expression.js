import { Tokenizer }  from '../src/Tokenizer.js'
import { Parser }  from '../src/Parser.js'
import { Evaluator }  from '../src/Evaluator.js'

export class Expression {
  constructor(expression) {
    this.tokens = null;
    this.rpn = null;
    this.expression = expression;
    this.extra = {
      'functions': {},
      'variables': {}
    }

  }

  tokenize() {
    this.tokens = Tokenizer.tokenize(this.expression);
  }

  parse() {
    if (this.tokens == null) {
      this.tokenize();
    }
    this.rpn = Parser.parse(this.tokens);
  }

  addFunction(fname, fn) {
    this.extra.functions[fname] = fn;
  }

  setFunctions(functions) {
    this.extra.functions = functions;
  }

  setVariable(varName, value) {
    this.extra.variables[varName] = value;
  }

  setVariables(variables) {
    this.extra.variables = variables;
  }


  evaluate() {
    if (this.rpn == null) {
      this.parse();
    }
    return Evaluator.evaluate(this.rpn, this.extra);
  }

}
