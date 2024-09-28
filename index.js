const fs = require('fs');
const commander = require('commander');

const program = new commander.Command();

program
  .requiredOption('-i, --input <path>', 'Path to file, response from NBU API')
  .option('-o, --output <path>', 'Path to the file where we will save the result')
  .option('-d, --display', 'Show result in console');

program.parse();

const options = program.opts();

// Перевірка наявності обов'язкового параметра
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Перевірка наявності файлу для читання
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Читання файлу (JSON)
const data = fs.readFileSync(options.input, 'utf-8');

// Обробка результату (для прикладу)
const result = JSON.parse(data); 

// Виведення результату
if (options.display) {
  console.log(result);
}

// Запис результату у файл
if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(result));
}
