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

// 📌 Type Inference (= Typescripts ability to guess the type of different variables in our program.)
// TS is smart! It can guess the types of your variables.
// So we don't have to add in type annotations all over the place.

// EX)
const hour = 20;
const you = "Mike";

function getName() {
  return "Me"; // :string (return annotation 필요❌)
}

// 427. Describing Objects with Interfaces
interface Car {
  year: number;
  make: string;
  model: string;
}

// function formatCar(car: { year: number; model: string; make: string }) {
//   return `Year: ${car.year}, model: ${car.model}, make: ${car.make}`;
// }

function formatCar(car: Car) {
  // car.tires; // 🚨 error
  return `Year: ${car.year}, model: ${car.model}, make: ${car.make}`;
}

formatCar({
  year: 2015,
  make: "Ford",
  model: "Mustang",
});

// 428. Using Interfaces to Annotate Props
// 리액트 프로젝트에서 여러 Prop들의 타입을 정의할 때, 코드가 너무 길어지는 것을 막기 위해 항상 '컴포넌트'+'Props' 이름의 interface를 만들어 타입을 정의하자!
import React from "react";

interface TaskShowProps {
  title: string;
  completed: boolean;
}

function TaskShow({ title, completed }: TaskShowProps) {
  return (
    <div>
      {title} - {completed ? "Done" : "Need to complete"}
    </div>
  );
}

<TaskShow title="write an interface" completed={true} />;

// 429. Downsides to Type Inference
interface Car2 {
  model: string;
  year: number;
}

function printCar(car: Car2) {
  console.log(car);
}

// ✅ You should put on a type annotation to have TS check your work and make sure that you defined this object correctly.
// const mustang: Car2 = {
//   model: "Mustang",
//   year: 2019,
// };

const camaro: Car2 = {
  model: "Camaro",
  year: "2010", // 🚨 Type 'string' is not assignable to type 'number'
};

printCar(mustang);
printCar(camaro); // 🚨 error (year 키에는 넘버 밸류만 가능한데 스트링이 왔으므로.. 이러한 에러 방지하기 위해 사용할 오브젝트에 먼저 type annotation을 체크하고 넘어가자! -> ✅)

// 430. Function Types
interface Car3 {
  model: string;
  year: number;
  setYear: (fsdfqdkmsa: number) => void;
  // ✅ void === I've got a function that doesn't return anything.
  // ✅ nextYear can be any name that doens't match actual name of the parameter.
  setModel: (nextModel: string) => void;
  getDescription: () => string;
}

const mustang: Car3 = {
  model: "Mustang",
  year: 2019,
  setYear(nextYear: number) {
    this.year = nextYear;
  },
  setModel(nextModel: string) {
    this.model = nextModel;
  },
  getDescription() {
    return `Year: ${this.year}, Model: ${this.model}`;
  },
};

// 🖍️ 경고표시에서 뜰 때 interface에서 설정한 매개변수 이름이 뜨게 된다.
mustang.setYear(); // An argument for 'fsdfqdkmsa' was not provided.
