import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React from "react";
import play from "../assets/images/play.svg";
import delete1 from "../assets/images/delete.svg";
import broom from "../assets/images/broom.svg";

interface Props {
  content?: string;
  editorClass?: string;
}

export const Editor = (props: Props) => {
  const { content, editorClass = "w-[100vw]" } = props;
  const frame: any = React.useRef(null);
  const [iframeContent, setIframeContent] = React.useState(
    content || "console.log('Start coding!');"
  );
  const [error, setError] = React.useState("");
  const [testId, setTestId] = React.useState(Date.now());
  
  //object to store js concepts
  const jsConcepts = {
    'Variable Declaration' : `//JS gives us 3 ways to declare variables
  //var, let, const
  //var is the old way, ES6 introduced let & const
  //advantage of let & const is that it allows scoping at the block level
  //let & const also doesn't allow redeclaration of a variable in a scope where it has already been declared once
  var fruit = "mango";
  console.log("value of fruit : " + fruit);
  var fruit = "apple";
  console.log("value of fruit after redeclaration : " + fruit);
  
  let bird = "eagle";
  console.log("value of bird after redeclaration : " + bird);
  //let bird = 'hawk' //will give error due to declaration
  
  //var is globally scoped when declared outside any function, and is function scoped when declared inside a function
  //let & const have block level scope
  
  function test() {
    var funVar = 7;
    let funLetVariable = 8;
    const PI = 3.14;
    console.log("funVar : " + funVar);
    console.log("funLetVariable : " + funLetVariable);
    console.log("PI : " + PI);
  }
  test();
  //following lines will give error as var, let & const has function level scope
  //console.log('funVar outside function : ' + funVar);
  //console.log('funLetVariable outside function :' + funLetVariable);
  //console.log('PI outside function : ' + PI)
  
  var tree = "mango";
  let cookies = "chocolate";
  console.log("value of tree outside block : " + tree);
  console.log("value of cookies outside block : " + cookies);
  //beginning of block
  {
    var tree = "papaya";
    let cookies = "coconut";
    console.log("value of tree inside block : " + tree);
    console.log("value of cookies inside block : " + cookies);
  }
  console.log("value of tree outside block : " + tree);
  console.log("value of cookies outside block : " + cookies);
  
  //both let & const are block level variables, but they differ as const value cannot  be changed once assigned
  let animal = "tiger";
  console.log("current animal : " + animal);
  animal = "lion";
  console.log("new animal : " + animal);
  
  const LIGHT_SPEED = 299792458;
  console.log("Speed of light in m/s is : " + LIGHT_SPEED);
  //following reassignment will give error as this is a constant variables.
  //LIGHT_SPEED = 0;
  //constant variables are generally used to store some hardcoded values and follows the naming convention CONSTANT_NAME
  //when we have a constant object, we can't reassign that variable as its constant but we can still change/update/delete its properties
  //This is because the constant variable is simply a reference to an object in memory. When you modify the properties of the object, you
  //are not changing the reference itself, but rather the data stored at that reference`,

    'Loops & Iterations' : `let array = [45, 23, 1, 0, 63];
let string = "SkillRazr";
let obj = { a: 1, b: 2, c: 3 };
//for loop
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

//while loop
let counter = 0;
while (counter > array.length) {
  console.log(array[counter]);
  counter++;
}

//Do While loop
counter = 1;
do {
  console.log("iteration no : " + counter);
  console.log(
    'The difference between "while" and "do-while" is that, in "while", the condition is checked first, and only then do we enter the loop. But in "do-while", we enter the loop first, and then check the condition, so in any case, the loop runs at least once.'
  );
} while (counter < 0);

//forEach method: The forEach method is available on arrays and is used to execute a function for each element in the array.
//forEach accepts a function as its parameter
//this function receives two parameters say 'i-th-element','element-index'
//where 'i-th-element' will be the i-th value and 'element-index' will be the value of I, that is the index of 'i-th-element' in given array
//second parameter 'element-index' is optional
array.forEach((element) => {
  console.log("Element : " + element);
});

array.forEach((element, i) => {
  console.log("Element no. " + ++i + " is : " + element);
});

//The for-of loop is used to iterate over the elements of an iterable object, such as an array.
for (let element of array) {
  console.log(element);
}

for (let element of string) {
  console.log(element);
}

//for-in loop: The for-in loop is used to iterate over the properties of an object.
for (let prop in obj) {
  console.log(prop + ": " + obj[prop]);
}`,
    'Arrays' : `//creating an array
//an array can have any type of elements within it, including other arrays and objects
let fruits = ["apple", "banana", "orange", "mango"];

//we can access its element using index
//index starts at 0 from the leftmost element, and at -1 at the rightmost element
console.log(fruits[2]);
console.log(fruits[0]);
console.log(fruits[-2]);

//we can get the length of an array using .length
console.log(fruits.length);

//we 'slice' an array to get a portion of an array
console.log(fruits.slice());
console.log(fruits.slice(0, 3));
console.log(fruits.slice(0, 2));
console.log(fruits.slice(2, 3));
console.log(fruits.slice(-2));
console.log(fruits.slice(-3, -1));

//push is used to add an element at the end
fruits.push("strawberry");
console.log(fruits);

//pop is used to return the last element and remove it from the array
let lastElement = fruits.pop();
console.log("last element : " + lastElement);
console.log("fruits : " + fruits);

//unshift is used to add an element at the start of an array
fruits.unshift("kiwi");
console.log("fruits : " + fruits);

//shift is used to return the first element and remove it from the array
let firstElement = fruits.shift();
console.log("First Element : " + firstElement);
console.log("fruits : " + fruits);`,
    'Functions' : `//a function can be declared and used in many ways in javascript

//using function keyword

function sum(a, b) {
  return a + b;
}

console.log("sum of 3,8 is : " + sum(3, 8));

//Functions can also be assigned to variables as an expression

let difference = function (a, b) {
  return a - b;
};

console.log("45 - 98 is : " + difference(45, 98));

//Arrow functions

let product = (a, b) => {
  return a * b;
};

console.log("product of 36, 21 is : " + product(36, 21));

//when we only have a single statement in function definition and its a return statement, we can directly write it

let division = (a, b) => a / b;
console.log("division of 66, 11 is : " + division(66, 11));

//if arrow function has a single parameter, () can be omitted

let double = (a) => a * 2;
console.log("Double of 456 is : " + double(456));

//we use IIFE (Immediately Invoked Function Expression) to execute a function as soon as it is defined without the need of calling it
(function () {
  console.log("I ran immediately, without being called.");
})();

(() => {
  console.log("Me too.");
})();`
  };

  //function to generate button for each each concept 
  const createButtons = () => {
    let buttons = []
    for (const concept in jsConcepts) {
      buttons.push(
        <button
          key={concept}
          onClick={() => {
            setIframeContent(jsConcepts[concept as keyof typeof jsConcepts]);
          }}
          id={`${concept}-button`}
          className="relative inline-flex items-center justify-center p-0.5 m-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
            {concept}
          </span>
        </button>
      )
    }
    return buttons;
  };

  React.useEffect(() => {
    content && setIframeContent(content);
  }, [content]);

  const updateOutput = (value: string) => {
    // setting up the iframe
    if (frame.current) {
      var win = frame.current.contentWindow;
      win.location.reload(); //refresh iframe window

      var doc = win.document;
      doc.open();
      console.clear();
      doc.close(); // must open and close document object to start using it!

      var s = doc.createElement("script");
      s.type = "text/javascript";

      const consoleScript = `
            console.log = function(...params) {
                var divElement = document.createElement("div");
                params.forEach((param) => {
                    var element = document.createElement("span");
                    let textNode = document.createTextNode(param + "  ");
                    element.appendChild(textNode);
                    divElement.appendChild(element);
                    //document.body.appendChild(element);
                });
                document.body.appendChild(divElement);
            };
            console.error = console.debug = console.info = console.log;`;

      const lib = doc.createElement("script");

      try {
        //handle errors
        win.onerror = function (error: string) {
          console.log("error", error);
          setError(error);
        };

        // overide console
        lib.type = "text/javascript";
        lib.appendChild(doc.createTextNode(consoleScript));

        //run javascript
        s.appendChild(doc.createTextNode(value));
        doc.head.appendChild(lib);
        doc.body.appendChild(s);
        doc.body.style = "font-size: 20px; color: black; padding: 10px";
      } catch (e) {
        console.log("error", e);
        lib.text = consoleScript;
        // s.text = code;
        doc.head.appendChild(lib);
        doc.body.appendChild(s);
      }
      // doc.body.appendChild('<script>' + value + '</script>');
    }
  };
  return (
    <div>
      <div className="py-2 text-4xl text-center">JavaScript Editor</div>
      <div
        style={{ padding: "20px" }}
        className={`flex align-center flex-col sm:flex-row ${editorClass}`}
      >
        <div className="editor p-2 w-full sm:w-6/12">
          <h2 className="py-2 text-2xl">Write JS here</h2>
          <CodeMirror
            autoFocus
            value={iframeContent}
            height="520px"
            extensions={[javascript({ jsx: true })]}
            onChange={(value, viewUpdate) => {
              console.log("value:", value, viewUpdate);
              //updateOutput(value);
              setIframeContent(value);
            }}
          />
        </div>

        <div className="output p-2 w-full sm:w-6/12">
          <button
            className="px-2 py-1 mx-0 my-10 btn border-[1px] border-black rounded bg-white text-black"
            onClick={() => {
              setTestId(Date.now());
              setError("");
              setTimeout(() => {
                //setTestId(Date.now());
                updateOutput(iframeContent);
              }, 500);
            }}
          >
            <img src={play} alt="play" width="32px" className="inline"></img>
            <span className="ml-1 mt-2">Run code</span>
          </button>
          {error && (
            <div>
              <span style={{ color: "red", fontSize: "20px" }}>{error}</span>
              <button
                className="btn py-1 px-2 mx-2 my-2 btn border-[1px] border-black rounded bg-white text-black"
                onClick={() => {
                  setError("");
                  // setTestId(Date.now());
                }}
              >
                <img
                  src={delete1}
                  alt="delete"
                  width="20px"
                  className="inline"
                ></img>
                <span className="ml-2">Delete</span>
              </button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-xl">Output</span>
            <button
              className="btn py-1 px-2 my-2 btn border-[1px] border-black rounded bg-white text-black"
              onClick={() => {
                setTestId(Date.now());
              }}
            >
              <img
                src={broom}
                alt="clear"
                width="24px"
                className="inline"
              ></img>
              <span>Clear</span>
            </button>
          </div>
          <iframe
            title="runner"
            key={testId}
            className="editor-iframe"
            ref={frame}
          />
        </div>
      </div>
      {/* section contains js concept buttons */}
      <section>
        <h2 className="text-center text-2xl">Some JavaScript Concepts</h2>
        <div className="text-center">{createButtons()}</div>
      </section>
    </div>
  );
};
