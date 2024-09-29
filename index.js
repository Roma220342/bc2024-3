const fs = require('fs');
const commander = require('commander');

const program = new commander.Command();

program
  .requiredOption('-i, --input <path>', 'json with NBU api request)')
  .option('-o, --output <path>', 'Path to file you want to save result')
  .option('-d, --display', 'Show result in console');

program.parse(process.argv);

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
const data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));

// Обробка результату  в форматі який заданий у варіанті 
//map не паше якщо data не масив. fs.readFileSync повертає рядок,
//тому його потрібно парсити як JSON, щоб отримати масив об’єктів 
const results = data.map(item => `${item.StockCode}-${item.ValCode}-${item.Attraction}`); 

// Виведення результату
if (options.display) {
  console.log(results);
}

// Запис результату у файл
if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(results, null, 2));
}
