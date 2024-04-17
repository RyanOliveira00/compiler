/**
 * O lexer é responsável por transformar o código fonte em uma sequência de tokens.
 *   - Números
 *   - Identificadores
 *   - Operadores binários
 *   - Parênteses
 *   - Atribuição
 *   - Palavras-chave
 *   - Comentários
 *   - Etc
 */

/* Representa os tokens que nossa linguagem reconhece
 * e que serão utilizados pelo parser para construir a árvore sintática.
 */
export enum TokenType {
  Null,
  // Tipos Literais
  Number,
  Identifier,

  // Palavras-chave
  Let,

  // Operadores
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,

  EOF, // Simboliza o fim do arquivo
}

/*
 * constate que mapeia palavras-chave para seus respectivos tokens.
 */
const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
  null: TokenType.Null
};

// Representa um token
export type Token = {
  value: string;
  type: TokenType;
};

// Função que cria um token a partir de um valor e um tipo
function token(value: string, type: TokenType): Token {
  return { value, type };
}

// Função que verifica se um caractere é uma letra -> [a-zA-Z]
function isAlpha(char: string): boolean {
  // REGEX que verifica se um caractere é uma letra
  // [a-zA-Z] - Qualquer letra de A a Z, tanto maiúscula quanto minúscula
  // [] - Representa um conjunto de caracteres
  // a-z - Qualquer letra de a a z
  // A-Z - Qualquer letra de A a Z
  return char.match(/[a-zA-Z]/) !== null;
}

// Função que verifica se um caracter e espaço em branco como -> ' ', '\n', '\t', '\r'
function isWhitespace(char: string): boolean {
  // REGEX que verifica se um caractere é um espaço em branco
  // \s - Qualquer espaço em branco
  return /\s/.test(char);
}

// Função que verifica se um caractere é um dígito -> [0-9]
function isDigit(char: string): boolean {
  // REGEX que verifica se um caractere é um dígito
  // [0-9] - Qualquer dígito de 0 a 9
  return char.match(/[0-9]+/) !== null;
}

/**
 * Função que transforma o código fonte em uma sequência de tokens.
 *
 */
export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = sourceCode.split("");

  // Produz tokens ate EOF (End of File) ser atingido
  while (src.length > 0) {
    // Remove espaços em branco
    const char = src.shift()!;

    // Ignora espaços em branco
    if (isWhitespace(char)) {
      continue;
    }

    // Verifica se o caractere é uma letra
    if (isAlpha(char)) {
      let value = char;
      // Continua adicionando caracteres enquanto eles forem letras ou dígitos
      while (src.length > 0 && (isAlpha(src[0]) || isDigit(src[0]))) {
        value += src.shift();
      }

      // Verifica se a palavra é uma palavra-chave
      const keyword = KEYWORDS[value];
      // Adiciona o token do identificador
      // Se a palavra for uma palavra-chave, adiciona o token da palavra-chave
      tokens.push(
        typeof keyword == 'number' ? token(value, keyword) : token(value, TokenType.Identifier)
      );
      continue;
    }

    if (isDigit(char)) {
      let value = char;
      // Continua adicionando caracteres enquanto eles forem dígitos
      while (src.length > 0 && isDigit(src[0])) {
        value += src.shift();
      }

      // Adiciona o token do número
      tokens.push(token(value, TokenType.Number));
      continue;
    }

    switch (char) {
      case "=":
        tokens.push(token(char, TokenType.Equals));
        break;
      case "(":
        tokens.push(token(char, TokenType.OpenParen));
        break;
      case ")":
        tokens.push(token(char, TokenType.CloseParen));
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        tokens.push(token(char, TokenType.BinaryOperator));
        break;
      default:
        throw new Error(`Unexpected character: ${char}`);
    }
  }

  tokens.push(token("EndOfFile", TokenType.EOF));
  return tokens;
}

