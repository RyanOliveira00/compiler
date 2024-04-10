// 

export enum TokenType {
  Number,
  Identifier,
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,
  Let,
}

export type Token = {
  value: string;
  type: TokenType;
};

function token(value: string, type: TokenType): Token {
  return { value, type };
}

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    const char = input[cursor];

    if (/\s/.test(char)
    ) {
      cursor++;
      continue;
    }

    if (
      char === "+" ||
      char === "-" ||
      char === "*" ||
      char === "/" ||
      char === "%" ||
      char === "^"
    ) {
      tokens.push(token("+", TokenType.BinaryOperator ));
      cursor++;
      continue;
    }

    if (char === "=") {
      tokens.push(token("=", TokenType.Equals));
      cursor++;
      continue;
    }

    if (char === "(") {
      tokens.push(token("(", TokenType.OpenParen));
      cursor++;
      continue;
    }

    if (char === ")") {
      tokens.push(token(")", TokenType.CloseParen));
      cursor++;
      continue;
    }

    if (char.match(/[0-9]/)) {
      let value = "";

      while (input[cursor] && input[cursor].match(/[0-9]/)) {
        value += input[cursor];
        cursor++;
      }

      tokens.push(token(value, TokenType.Number ));
      continue;
    }

    if (char.match(/[a-zA-Z]/)) {
      let value = "";

      while (input[cursor] && input[cursor].match(/[a-zA-Z]/)) {
        value += input[cursor];
        cursor++;
      }

      if (value === "let") {
        tokens.push(token(value, TokenType.Let ));
      } else {
        tokens.push(token(value, TokenType.Identifier));
      }

      continue;
    }

    throw new Error(`Invalid character: ${char}`);
  }

  return tokens;
}

for (const token of tokenize("let x = 1 + 2 * ( 4 / 3 )")) {
  console.log(token);
}