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
    id: 1,
    question: "What is positioning in CSS?",
    answer: `In CSS, there are four types of positioning: static, relative, absolute, and fixed. Here's a summary of each type:
    Static: This is the default positioning for all elements. The element is positioned in the normal flow of the document, according to its position in the HTML.
    Relative: This type of positioning allows an element to be positioned relative to its normal position in the HTML. The element is still positioned in the normal flow of the document, but can be moved using the top, bottom, left, and right properties.
    Absolute: This type of positioning allows an element to be positioned relative to its nearest positioned ancestor (an ancestor element with a position value other than static). If there is no positioned ancestor, the element is positioned relative to the body element. The element is removed from the normal flow of the document, so other elements can flow around it.
    Fixed: This type of positioning is similar to absolute positioning, but the element is positioned relative to the viewport (the browser window), rather than an ancestor element. The element is also removed from the normal flow of the document.
    In addition to these four types of positioning, there are also z-index and float properties that can affect the positioning of elements. The z-index property specifies the stack order of an element, and the float property allows an element to be floated to the left or right of its container.`,
    category: "css",
    description: "CSS positioning",
  },
];
