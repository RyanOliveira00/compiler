/*
 * O AST (Abstract Syntax Tree) é uma representação intermediária da estrutura do código fonte.
 * Ele é utilizado para facilitar a análise e transformação do código fonte.
 *    - Program: representa o programa como um todo.
 *    - Stmt: representa uma instrução.
 *    - Expr: representa uma expressão.
 *    - NumericLiteral: representa um número.
 *    - Identifier: representa um identificador.
 *    - BinaryExpr: representa uma expressão binária.
 *    - NumericLiteral: representa um literal numérico.
 */

export type NodeType =
  | "Program"
  | "NumericLiteral"
  | "NullLiteral"
  | "Identifier"
  | "BinaryExpr";

/**
 * Interface que representa um nó do AST.
 *  - kind: tipo do nó.
 * - [key: string]: qualquer outra propriedade.
 */
export type Stmt = {
  kind: NodeType;
};

/**
 * Interface que representa um programa.
 * - kind: tipo do nó.
 * - body: lista de instruções.
 */
export interface Program extends Stmt {
  kind: "Program";
  body: Stmt[];
}

/**
 * Interface que representa uma expressão.
 */
export interface Expr extends Stmt {}

/**
 * Interface que representa uma expressão binária.
 * - kind: tipo do nó.
 * - operator: operador da expressão.
 * - left: expressão à esquerda.
 * - right: expressão à direita.
 */
export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  operator: string;
  left: Expr;
  right: Expr;
}

/**
 * Interface que representa um literal numérico.
 * - kind: tipo do nó.
 * - value: valor do número.
 */
export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}

/**
 * Interface que representa um identificador.
 * - kind: tipo do nó.
 * - symbol: nome do identificador.
 */
export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

/**
 * Interface que representa numerico literal.
 */
export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}

/**
* Interface que representa um literal nulo.
*/
export interface NullLiteral extends Expr {
  kind: "NullLiteral";
  value: "null";
}