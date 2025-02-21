// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

const anExampleVariable = "Hello World";
console.log(anExampleVariable);

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

const color: string = "red";
const isRed: boolean = color === "red";
const age: number = 25;

const colors: string[] = ["red", "green", "blue"];
const ages: number[] = [20, 30, 40];
const areColorsRed: boolean[] = [true, false, false];

// EX1)
function add(a: number, b: number): number {
  return a + b;
}

// EX2)
function printColors(colors: string[]) {
  console.log(colors);
}
printColors(["asdf", "asdf", 123]); // 🚨 error

function printAge(age: number) {
  console.log(age);
}
printAge(true); // 🚨 error
