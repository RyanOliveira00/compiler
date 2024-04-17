// import { tokenize } from "./modules/lexer";

// const data = Bun.file(Bun.argv[2]);
// const source_code = await data.text();
// for (const token of tokenize(source_code)) {
//   console.log(token);
// }
import Parser from "./modules/parser";

letfy();

function letfy() {
  const parser = new Parser();
  console.log("Bem-vindo ao LETFY! Digite 'exit' para sair.");
  while (true) {
    const input = prompt("> ");

    if (!input || input === "exit") {
      break;
    }

    const program = parser.produceAST(input);
    console.log(program.body);
  }
}
