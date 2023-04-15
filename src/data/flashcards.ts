export const flashcardCategories = [
  {
    id: 1,
    title: "JavaScript",
    category: "javascript",
    description: "Flashcards to memorise JavaScript concepts easily",
  },
  {
    id: 1,
    category: "css",
    title: "CSS",
    description: "Flashcards to memorise CSS concepts easily",
  },
  {
    id: 1,
    category: "html",
    title: "HTML",
    description: "Flashcards to memorise HTML concepts easily",
  },
];

export const flashcards = [
  {
    id: 1,
    question: "What is closure in JS?",
    answer: `In JavaScript, a closure is created when a function is defined within another function and the inner function accesses variables from the outer function's scope. The inner function "closes over" the outer function's scope, hence the name "closure".`,
    category: "javascript",
    description: "JS closure",
  },
  {
    id: 2,
    question: "What is hoisting in JS?",
    answer: `JavaScript hoisting is a behavior in which variable and function declarations are moved to the top of their respective scopes during the compilation phase, allowing them to be accessed before they are declared in the code. However, only the declaration is hoisted, not the initialization or assignment.`,
    category: "javascript",
    description: "JS hoisting",
  },
  {
    id: 3,
    question:
      "What is the difference between let, var, and const in JavaScript?",
    answer: `let and const were introduced in ES6 and provide block-level scoping, while var has function-level scoping. const is used to declare a constant value that cannot be reassigned, while let can be reassigned.`,
    category: "javascript",
    description: "let vs var vs const",
  },
  {
    id: 4,
    question: "What is an event in JavaScript?",
    answer: `An event is an action or occurrence that happens on a web page, such as a click, scroll, or key press, that can trigger JavaScript code to perform a specific function.`,
    category: "javascript",
    description: "events",
  },
  {
    id: 5,
    question: "What is a callback function in JavaScript?",
    answer: `A callback function is a function that is passed as an argument to another function and is executed after some specific event or action takes place.`,
    category: "javascript",
    description: "JS Callback function",
  },
  {
    id: 6,
    question: "What is the DOM in JavaScript?",
    answer: `The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page so that JavaScript can change and manipulate the content.`,
    category: "javascript",
    description: "JS DOM",
  },

  {
    id: 1,
    question: "What is positioning in CSS?",
    answer: `Positioning in CSS allows you to control the layout and positioning of HTML elements on a web page. It includes various properties such as position, top, bottom, left, and right, which can be used to position elements relative to their containing element or to the browser window.`,
    category: "css",
    description: "CSS positioning",
  },
  {
    id: 2,
    question: "What is the syntax for adding CSS to an HTML document?",
    answer: `CSS can be added to an HTML document using the <style> tag or by linking to an external CSS file using the <link> tag. in CSS allows you to control the layout and positioning of HTML elements on a web page. It includes various properties such as position, top, bottom, left, and right, which can be used to position elements relative to their containing element or to the browser window.`,
    category: "css",
    description: "syntax of css",
  },
  {
    id: 3,
    question: "What is the difference between padding and margin in CSS?",
    answer: `Padding is the space within an element, while margin is the space outside of an element`,
    category: "css",
    description: "CSS padding & margin",
  },
  {
    id: 4,
    question: "What is the box model in CSS?",
    answer: `The box model is a design concept in CSS that treats every element on a webpage as a rectangular box.`,
    category: "css",
    description: "box model",
  },
  {
    id: 5,
    question: "What is the purpose of the z-index property in CSS?",
    answer: `The z-index property is used to control the stacking order of elements on a webpage.s a design concept in CSS that treats every element on a webpage.`,
    category: "css",
    description: "z-index",
  },
  {
    id: 6,
    question:
      "What is the difference between inline and block elements in CSS?",
    answer: `Inline elements are displayed on the same line as their surrounding content, while block elements start on a new line.`,
    category: "css",
    description: "inline vs block",
  },
  {
    id: 7,
    question: "What is the purpose of the float property in CSS?",
    answer: `The float property is used to position elements to the left or right of their container.`,
    category: "css",
    description: "float property",
  },
  {
    id: 8,
    question:
      "What is the difference between absolute and relative positioning in CSS?",
    answer: ` Absolute positioning places an element relative to the nearest positioned ancestor, while relative positioning places an element relative to its normal position on the page.`,
    category: "css",
    description: "absolute vs relative positioning",
  },
  {
    id: 1,
    question: "What is the purpose of the <head> tag in HTML?",
    answer: `The <head> tag is used to include metadata and other information about the HTML document, such as the title of the page and links to external stylesheets.`,
    category: "html",
    description: "purpose of <head> tag",
  },
  {
    id: 2,
    question: "What is the role of the <a> tag in HTML?",
    answer: `The <a> tag is used to create hyperlinks to other web pages, documents, or locations within the same page.`,
    category: "html",
    description: "<a> tag",
  },
  {
    id: 3,
    question: "What is the difference between the <ul> and <ol> tags in HTML?",
    answer: `The <ul> tag is used to create an unordered list, while the <ol> tag is used to create an ordered list.`,
    category: "html",
    description: "<ul> & <ol> tags",
  },
  {
    id: 4,
    question: "What is the purpose of the alt attribute in the <img> tag?",
    answer: `The alt attribute is used to provide alternative text for an image, which can be read by screen readers for users with visual impairments.`,
    category: "html",
    description: "<img> tag",
  },
];
