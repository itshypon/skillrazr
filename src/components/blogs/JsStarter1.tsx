import React from "react";
import { Editor } from "../Editor";
import QuizInLine from "../QuizInline";
import jsStarter1 from "../../scripts/js_starter_quiz1.json";
import jsStarter2 from "../../scripts/js_starter_quiz2.json";
import jsStarter3 from "../../scripts/js_starter_quiz3.json";
import jsStarter4 from "../../scripts/js_starter_quiz4.json";
import { Button } from "@mui/material";

const JsStarter1 = () => {
  const [content, setContent] = React.useState(
    ` const a = 10; \n const b = 12; \n const c = a + b; \n console.log('c =', c);`
  );
  return (
    <div className="text-2xl">
      <h1 className="text-6xl py-5 text-center">JS Starter 1</h1>
      <h1 className="text-5xl py-5">Introduction</h1>
      JavaScript is a popular programming language that is used to create
      interactive and dynamic websites. It is a versatile language that can be
      used to create a wide range of applications, from simple website
      enhancements to complex web applications. If you are new to JavaScript, it
      can be intimidating to start learning a new programming language. However,
      with some practice and dedication, you can quickly become proficient in
      JavaScript and start building your own interactive web projects. To get
      started with JavaScript, you will need a text editor to write your code
      and a web browser to run and test your code. All modern web browsers come
      with developer tools that allow you to run and debug your code. To make it
      easy <b>we've integrated a code editor in this page itself </b>, so that
      you can run your code to understand concepts quickly. Let's start knowing
      the basic constructs in JS.
      <h1 className="text-5xl py-5">Basic Constructs</h1>
      <b>Variables</b> are used to store and manipulate data in a program. They
      can be declared using the var, let, or const keywords and can hold any
      data type, including numbers, strings, and arrays.
      <br /> <br />
      <b>Conditional statements</b> are used to execute different blocks of code
      based on whether a certain condition is met. The most common conditional
      statements in JavaScript are if, else, and switch. <br /> <br />
      <b>Loops</b> allow a block of code to be executed repeatedly until a
      certain condition is met. There are several types of loops in JavaScript,
      including for, while, and do-while. Loops are useful for iterating over
      arrays and other data structures, as well as for performing tasks a
      certain number of times. <br /> <br />
      <b>Functions</b> are blocks of code that can be defined and called by
      name. They are used to perform a specific task and can accept arguments
      and return a value. Functions are a fundamental building block of
      JavaScript and are used to structure and organize code. <br /> <br />
      <b>Arrays </b>
      are data structures that store a collection of values. They are useful for
      storing and manipulating lists of data. Arrays in JavaScript are dynamic,
      meaning that they can grow or shrink in size as needed and JS allows
      heterogeneous data types in an array <br /> <br />
      <b>Object-oriented programming (OOP) </b> is another important concept in
      JavaScript. OOP is a programming paradigm that is based on the concept of
      objects and their interactions. Objects can have properties (data) and
      methods (functions) and can be created using constructor functions or
      class syntax. OOP allows for the creation of reusable code and the
      modeling of real-world concepts in a program. Objects in JavaScript are
      collections of key-value pairs that represent real-world entities. They
      are similar to arrays but are more flexible, as the keys can be any data
      type.
      <b>Classes</b> are a syntax introduced in ECMAScript 2015 (also known as
      ES6) for defining object-oriented classes in JavaScript. They provide a
      cleaner and more concise way to create objects and define their methods
      and properties. Classes can be extended and inherited from, allowing for
      the creation of complex object hierarchies
      <br /> <br />
      <b>DOM Manipulation</b> JavaScript is also used to manipulate the Document
      Object Model (DOM), which is a tree-like representation of an HTML or XML
      document. By using JavaScript, you can add, delete, and modify elements on
      a web page, allowing for dynamic and interactive web pages. <br /> <br />
      <b>Asynchronous programming </b> is another important aspect of
      JavaScript. JavaScript is a single-threaded language, which means that it
      can only execute one task at a time. Asynchronous programming allows
      JavaScript to execute tasks in the background while still allowing the
      main thread to run. This is important for maintaining the responsiveness
      of a web page and is achieved through the use of asynchronous functions
      such as setTimeout, setInterval, and Promise.
      <br /> <br />
      <div className="text-4xl">Other JS topics that you should know :-</div>
      <br />
      <b>Scope and Hoisting in JS</b>
      <br />
      <b>
        Function as first class citizen, function declaration vs function
        expressions
      </b>
      <br />
      <b>Closures in JS</b>
      <br />
      <b>Promises</b>
      <br />
      <b>Async/await</b>
      <br /> <b>Modules</b> <br /> <b>Rest and spread operator </b>
      <br />
      <b>Map and Set </b>
      <br />
      <b>Template literal </b>
      <br />
      <br />
      As you continue to learn and practice JavaScript, you will become more
      familiar with these concepts and be able to use them to build simple and
      complex web applications. <br /> <br />
      Overall, JavaScript is a powerful and versatile programming language that
      is essential for creating interactive and dynamic websites. With some
      practice and dedication, you can quickly become proficient in JavaScript
      and start building your own web projects.
      <div className="text-3xl my-8">Let's run some code examples :- </div>
      <Button
        className="!mr-2"
        variant="outlined"
        onClick={() =>
          setContent(
            `const a = 10; \nconst b = 5; \nconst sum = a + b; \nconsole.log('sum =', sum); \nconst sub = a - b; \nconsole.log('sub =', sub);`
          )
        }
      >
        Load Arithmatic operations
      </Button>
      <Button
        className="!mr-2"
        variant="outlined"
        onClick={() =>
          setContent(
            `function isEvenNumber(num) { \n return num% 2 === 0;  \n} \nconsole.log('isEvenNumber(5)', isEvenNumber(5));\nconsole.log('isEvenNumber(6)', isEvenNumber(6));`
          )
        }
      >
        Load function defination
      </Button>
      <Button
        className="!mr-2"
        variant="outlined"
        onClick={() =>
          setContent(
            ` const isEvenNumber = (num) => num % 2 === 0; \n console.log('isEvenNumber(5) =', isEvenNumber(5)) \n console.log('isEvenNumber(6) =', isEvenNumber(6));`
          )
        }
      >
        Load function expression
      </Button>
      <Button
        className="!mr-2"
        variant="outlined"
        onClick={() =>
          setContent(
            `const a = [1, 2, 3]; \nconst b = 5; \nconst c = a.push(b); \nconsole.log('c =', c, 'a = ', a); \n\nconst a1 = [1, 2, 3]; \nconst c1 = a1.pop(); \nconsole.log('c1 =', c1, 'a1 = ', a1);
            `
          )
        }
      >
        Arrays
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          setContent(
            `const obj = {a: 5, b: 3}; \nobj['c'] = 8;\nconsole.log('c val in obj = ', obj.c);`
          )
        }
      >
        Objects
      </Button>
      <Editor content={content} />
      <div>
        Now it's time to learn more and evaluate thru some quizzes! <br />
        Below quizzes are generated using ChatGPT and tweaked to make it
        relevant.
      </div>
      <QuizInLine quizData={jsStarter1} />
      <QuizInLine quizData={jsStarter2} hideHowToParticipate />
      <QuizInLine quizData={jsStarter3} hideHowToParticipate />
      <QuizInLine quizData={jsStarter4} hideHowToParticipate />
      <div className="text-3xl my-4">Next-steps</div>
      <div>
        Consistently coding in JS will help you understand these concepts and
        other related concepts more. Practising is the key, you learn by coding.
      </div>
      <br />
      <div className="text-3xl my-4">Referrences :- </div>
      <br />
      <div>
        <a
          className="underline"
          href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics"
        >
          MDN JS Basics
        </a>
        <a
          className="underline block"
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
        >
          MDN JS Arrays
        </a>
      </div>
    </div>
  );
};

export default JsStarter1;
