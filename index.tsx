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
function add(a: number, b: number) {
  return a + b; // :number (return annotation 필요❌)
}

const sum = add(1, 6); // sum must be a number(TS can guess)

// EX2)
function printColors(colors: string[]) {
  console.log(colors);
}
printColors(["asdf", "asdf", 123]); // 🚨 error

// EX3)
function printAge(age: number) {
  console.log(age);
}
printAge(true); // 🚨 error

// 📌 Type Inference
// TS is smart! It can guess the types of your variables.
// So we don't have to add in type annotations all over the place.

// EX)
const hour = 20;
const you = "Mike";

function getName() {
  return "Me"; // :string (return annotation 필요❌)
}
