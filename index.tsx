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

// ✅ You should put on a type annotation to have TS check your work and make sure that you defined "this object" correctly.
const mustang2: Car2 = {
  model: "Mustang",
  year: 2019,
};

const camaro: Car2 = {
  model: "Camaro",
  year: "2010", // 🚨 Type 'string' is not assignable to type 'number'
};

printCar(mustang2);
printCar(camaro); // 🚨 error (year 키에는 넘버 밸류만 가능한데 스트링이 왔으므로.. 이러한 에러 방지하기 위해 "사용할 오브젝트"에 먼저 type annotation을 체크하고 넘어가자! -> ✅)

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

// 431. Function Types in Props Interfaces
// import React from "react";

interface ColorPickerProps {
  colors: string[];
  handleColorSelect: (color: string) => void;
}

function ColorPicker({ colors, handleColorSelect }: ColorPickerProps) {
  const renderedColors = colors.map((color) => {
    return (
      <button key={color} onClick={() => handleColorSelect(color)}>
        {color}
      </button>
    );
  });

  return <div>{renderedColors}</div>;
}

<ColorPicker
  colors={["red", "green", "blue"]}
  // handleColorSelect={(color: string) => console.log(color)}
  handleColorSelect={(color) => console.log(color)} // TS knows what to expect for prop(color: string). (Only works when we're passing this function directly into this prop.)
/>;

// 432. Extending an Interface
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={() => onClick()}>{label}</button>;
}

// 겹치는 prop 타입 주석은 반복해서 쓰지 말고, extends 키워드를 이용하여 가져오자!
interface IconButtonProps extends ButtonProps {
  // label: string;
  // onClick: () => void;
  icon: string;
}

function IconButton({ label, onClick, icon }: IconButtonProps) {
  return (
    <button onClick={() => onClick()}>
      {icon}
      {label}
    </button>
  );
}

// 433. Type Unions
interface Image {
  src: string;
}

interface User {
  username: string;
}

// 436. Type Predicates (= predicate = “참(true)인지 거짓(false)인지 판별하는 함수)
// ☑️ value is User ===> “이 함수가 true를 반환하는 분기에서는 value가 User 타입임을 컴파일러에게 보장한다”
// 이 함수가 true를 리턴하면 호출한 쪽의 제어 흐름 안에서 value가 User로 좁혀(narrow)지므로, false면 Image로 좁혀짐

// ☑️ 컴파일러가 믿는 약속
// 내부 구현은 아무 boolean이나 리턴할 수 있지만, 타입 시스템은 당신이 올바르게 구현했다고 신뢰합니다. 만약 실제로는 User가 아닌데 true를 반환하면, 컴파일러는 User라고 믿고 value.username 접근을 허용하므로 런타임 오류가 날 수 있어요. (즉, 정확한 판별 로직을 넣는 게 중요)
function isUser(value: Image | User): value is User {
  return "username" in value; // This can be true only if value is User obj.
}

function logOutput(value: Image | User) {
  // if (typeof value === "object") {
  //   value;
  // }

  // 1️⃣'in' operator (to check if there's a certain property in the object)
  // if ("username" in value) {
  if (isUser(value)) {
    // 2️⃣Or you can use 'Type Predicate' (=function that's gonna narrow down a type for you).
    value; // This can be only 'User' obj.
    console.log(value.username);
  } else {
    console.log(value.src);
  }

  // if ("src" in value) {
  //   console.log(value.src);
  // }
}

logOutput({ src: "img.jpg" });
logOutput({ username: "jiyoung" });

/*
function logOutput(value: string | number | string[] | Image) {
  // if value is a string... (434. Type Narrowing)
  if (typeof value === "string") {
    value.toUpperCase(); // TS knows when the value is only string, this line will be called -> safely call toUpperCase on it.
  }
  value; // value might be string or number or arr of string or obj.

  if (typeof value === "number") {
    Math.round(value);
  }

  // 435. Tricky Cases with Type Guards
  // Array is also an object. -> TRICKY!!!
  if (typeof value === "object") {
    value; // narrow down value to being either 'Image' | 'string[]'
  }

  if (Array.isArray(value)) {
    value.join(""); // This only can be string[].
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    value.src; // This only can be Image(obj).
  }
}

logOutput("hi there");
logOutput(123);
logOutput(["hi", "there"]);
logOutput({ src: "img.jpg" });
logOutput(true); // 🚨 error (boolean isn't specified)
*/

// 434. Optional Properties
interface UserProfile {
  likes: string[];
}

interface User {
  id: string;
  username: string;
  profile?: UserProfile; // ?: optional properties
}

const user: User = {
  id: "abc",
  username: "me",
  profile: {
    likes: ["cats"],
  },
};

// ?: optional properties -> 2번째 매개변수인 message는 있을 수도, 없을 수도 있음!
function logValue(value: string, message?: string) {
  if (message) {
    console.log(message, value);
  } else {
    console.log(value);
  }
}

logValue("lskfsjk"); // 에러 발생 X
logValue("lskfsjk", "message is here!");

// 438. The "Any" and "Unknown" Types
//  - any:
//  - "타입 검사 꺼!"와 동일. 어떤 프로퍼티 접근/호출도 컴파일 오류 없음.
//  - 빠르게 막힐 때 임시로 쓰기 쉽지만, 타입 안정성이 0이라 런타임 에러 유발 가능.
//  - ESLint/TSLint 등에서 사용 지양 권장. "정말 불가피할 때만" + "빠르게 대체/제거".

//  - unknown:
//    - "무엇이든 올 수 있음"을 타입시스템에 솔직히 알림. (any와 뉘앙스는 비슷하지만…)
//    - 🌟차이: 좁히기(narrowing) 전에는 어떤 프로퍼티/연산도 금지 → 안전!🌟
//    - 사용 시 반드시 타입가드(체크) 또는 단언(주의!)를 통해 실제 타입을 확인해야 함.

//  - 권장 전략:
//  - 외부/서드파티/네트워크 입력 = unknown 으로 받고, "정확한 좁히기" 후 사용.
//  - any는 꼭 필요할 때만 일시적으로. 가능하면 빠르게 unknown + 타입가드로 전환.
interface Book {
  title: string;
}

// 1) any 예시 (🚫 지양)
// ---------------------------------------------------------------------
async function fetchBook_withAny(): Promise<Book> {
  const res = await fetch("/book");
  const data: any = await res.json();
  // ❌ any이므로 어떤 속성이든 접근 가능하고, 컴파일러가 막지 않음.
  //    잘못된 키를 써도 타입 오류가 안 나서, 런타임에야 폭발할 수 있음.
  // console.log(data.titel.toUpperCase()); // 오타(titel)여도 컴파일 OK → 런타임 에러 가능

  // ✅ "타입 단언"으로 Book이라고 우겨 넣을 수는 있음 (하지만 틀리면 런타임 에러!💥💥💥)
  //    as Book은 '검증'이 아니라 '신뢰'를 의미. 따라서 도착 데이터가 ⚠️진짜 Book인지 확인하지 않음.⚠️
  return data as Book;
}

// 2) unknown 예시 (✅ 권장)
//    - 외부 입력은 unknown으로 받고, '안전한 좁히기(타입가드)' 후 사용
// ---------------------------------------------------------------------

// (A) 인라인으로 좁히기
async function fetchBook(): Promise<Book> {
  const res = await fetch("/book");
  const data: unknown = await res.json();

  // ✅ unknown은 바로 프로퍼티 접근 불가 → 아래처럼 "정교한 체크"가 필요
  if (
    data && // null/undefined/false 빈값 방지
    typeof data === "object" && // 객체인지 확인
    "title" in data && // title 키가 존재하는지
    typeof data.title === "string" // title의 타입이 string인지
  ) {
    // 위 조건을 전부 통과 → Book의 구조를 만족한다고 '합리적으로' 판단 가능
    return data as Book; // 여기서의 as Book은 '검증을 통과했음'에 근거한 단언(상대적으로 안전)
  }

  // 예상과 다른 데이터라면 조기 실패로 안전성 확보
  throw new Error("Expected to get a Book, but didn't");
}
// ---------------------------------------------------------------------
// (B) 재사용 가능한 타입가드로 분리 (가독성↑, 테스트 용이)
// ** 타입가드 분리에서 as를 거의 안 쓰는 이유: isBook이 type predicate(value is Book)을 반환하므로, if (isBook(data)) 블록 안에서는 컴파일러가 자동으로 Book으로 좁혀줍니다. → 그래서 바깥에서 as Book을 또 할 필요가 없음.
function isBook(value: unknown): value is Book {
  // ✅ 이 함수가 true를 반환하면, 호출부에서 value가 Book으로 좁혀짐
  return (
    !!value &&
    typeof value === "object" &&
    "title" in value &&
    typeof (value as any).title === "string"
  );
}

async function fetchBook_withGuard(): Promise<Book> {
  const res = await fetch("/book");
  const data: unknown = await res.json();

  if (isBook(data)) {
    // 여기 들어오면 data는 Book으로 좁혀짐 → 안전하게 사용 가능
    return data;
  }
  throw new Error("Expected to get a Book, but didn't");
}
