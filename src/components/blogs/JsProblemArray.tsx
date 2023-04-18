import React, { useState } from "react";
import { Button } from "@mui/material";
import { Editor } from "./../Editor";
import Modal from "./../Modal";
import CodeIcon from '@mui/icons-material/Code';

const JsProblemSolving = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(
    ` const a = 10; \n const b = 12; \n const c = a + b; \n console.log('c =', c);`
  );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="text-2xl flex flex-col w-full">
      <h1 className="text-4xl py-5 text-center lg:text-left wrap">
        Improving Your JS Problem Solving Skills
      </h1>
      <h1 className="text-3xl py-5">Introduction</h1>
      <div>
        Problem-solving is an essential skill for any software developer, and
        it's an essential skill to clear interviews and excel in your job as a
        developer. <br />
        <br />
        Here are some general steps to approach problem-solving in JavaScript:-
        <br /> <br />
        <ul className="list-decimal ml-6 blog-ul">
          <li>
            <b> Understand the problem:</b> Before you start coding, make sure
            you fully understand the problem you're trying to solve. Ask
            yourself questions like: What input do I need? What output do I
            expect? What are the constraints? What are the edge cases?
          </li>
          <li>
            <b>Break it down:</b> Break the problem down into smaller parts or
            steps. It's often easier to solve smaller problems than to tackle
            one large problem all at once. Write down each step in pseudocode or
            comments to help you plan your solution.
          </li>
          <li>
            <b>Write your code:</b> Once you've planned your solution, start
            writing your code. Focus on one step at a time, testing each step as
            you go.
          </li>
          <li>
            <b>Don't fear :-</b> Don't be afraid to make mistakes – programming
            is all about trial and error.
          </li>
          <li>
            <b>Test your code: </b> Test your code thoroughly, making sure it
            works as expected for all possible inputs and edge cases. Use
            console.log(. to print out intermediate results and debug any issues
            you encounter.
          </li>
          <li>
            <b>Optimize your code:</b> Once your code is working, look for ways
            to optimize it. Can you simplify your code? Can you use built-in
            JavaScript functions to make your code more efficient? Can you
            reduce the number of lines of code?
          </li>
          <li>
            <b>Refactor your code:</b> Finally, refactor your code to make it
            more readable and maintainable. Use descriptive variable names, add
            comments where necessary, and organize your code into logical
            sections. Remember that problem-solving is a skill that takes time
            and practice to develop. Don't get discouraged if you don't solve a
            problem right away – keep practicing and learning, and you'll get
            better over time.
          </li>
        </ul>
      </div>
      <div>
        <h1 className="text-3xl py-5">JS Arrays:-</h1>
        JavaScript arrays are a powerful data structure that can be used to
        solve a wide range of problems. Here are some general steps to approach
        problem-solving using arrays in JavaScript: <br />
        <br />
        <ul className="list-decimal ml-6 blog-ul">
          <li>
            Define the problem you want to solve in detail. What is the input?
            What is the expected output? What are the constraints?{" "}
          </li>
          <li>
            Determine the required operations: This is most important step.
            Based on the problem definition, determine what operations you need
            to perform on the array. This could include operations like adding
            (use push, concat, unshift array methods), removing(use pop, shift
            array methods), sorting (sort method), filtering (filter method), or
            searching (filter method) for values, conversion of values (map
            method) in the array. For traversing the array you can use basic for
            loop, forEach loop and for of loop etc. <br /> Know how to use Array
            reduce method to apply one operation on each element in the array to
            get a final result.
          </li>
          <li>
            Create an output array if that is appropriate for the problem you
            are trying to solve or modify the input array if modification is
            allowed/required.
          </li>
          <li>
            Use console.log() to print out intermediate results and debug any
            issues you encounter.
          </li>
        </ul>
        <br />
        Remember that arrays can be used to solve a wide range of problems, so
        it's important to understand the array methods and operations available
        to you in JavaScript. Practice using arrays to solve different types of
        problems, and you'll become more comfortable and proficient in using
        them. <br />
        <br />
        <b>Problem solving Array exercises:-</b> Here are some JavaScript array
        exercises that you can use to practice your problem-solving skills:{" "}
        <br />
        <br />
        <ul className="list-decimal ml-6 blog-ul">
          <li>
            {" "}
            <b>Sum of Array:</b> Write a function that takes an array of numbers
            as input and returns the sum of all the numbers in the array. <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function sum(arr) {\n\tlet sum = 0;\n\tfor (let i =0; i<arr.length; i++) {\n\t\tsum += arr[i];\n\t}\n\treturn sum;\n}\nconst numbers = [1,2,3,4,5];\nconst result = sum(numbers);\nconsole.log(result);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            {" "}
            <b>Average of Array:</b> Write a function that takes an array of
            numbers as input and returns the average of all the numbers in the
            array. <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function avg(arr) {\n\tlet sum = 0;\n\tfor (let i =0; i<arr.length; i++) {\n\t\tsum += arr[i];\n\t}\n\tconst avg = sum / arr.length;\n\treturn avg;\n}\nconst numbers = [1,2,3,4,5];\nconst result = avg(numbers);\nconsole.log(result);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            {" "}
            <b>Sorting of Array:</b> Write a function that takes an array of
            numbers as input and returns a new sorted array of all the numbers
            in the array. <br />
            <Button
              variant="outlined"
              onClick={() => {
                openModal();
                setContent(
                  `function sort(arr) {\n\treturn arr.sort((a, b) => a - b);\n}\nconst numbers = [5,2,1,3,6];\nconst sortedArr = sort(numbers);\nconsole.log(sortedArr);\n/*We use comparsion function as \nargument because in-built sort \nfunction of JS converts array \nelements into string which may \ngive wrong result. We can also \nuse user-defined sorting functions to sort.*/`
                );
              }}
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function sort(arr) {\n\treturn arr.sort((a, b) => a - b);\n}\nconst numbers = [5,2,1,3,6];\nconst sortedArr = sort(numbers);\nconsole.log(sortedArr);\n/*We use comparsion function as \nargument because in-built sort \nfunction of JS converts array \nelements into string which may \ngive wrong result. We can also \nuse user-defined sorting functions to sort.*/`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b>Largest Number in Array:</b> Write a function that takes an array
            of numbers as input and returns the largest number in the array.{" "}
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function largestNum(arr) {\n\t let num = arr[0];\n\tfor(let i=1; i<arr.length; i++) {\n\t\tif(arr[i] > num) {\n\t\t\tnum = arr[i];\n\t\t}\n\t}\n\treturn num;\n}\nconst numbers = [5,2,1,6,3];\nconst largestNumber = largestNum(numbers);\nconsole.log(largestNumber);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b>Smallest Number in Array:</b> Write a function that takes an
            array of numbers as input and returns the smallest number in the
            array. <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function smallestNum(arr) {\n\t //Your Code Here\n}\nconst numbers=[2,3,1,4,5];\nconst result = smallestNum(numbers);\nconsole.log(result);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            {" "}
            <b>Reverse Array: </b> Write a function that takes an array as input
            and returns a new array with the elements in reverse order.
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function reverseArr(arr) {\n\t //Your Code Here\n}\nconst numbers=[2,3,1,4,5];\nconst result = reverseArr(numbers);\nconsole.log(result);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b>Remove Duplicates:</b> Write a function that takes an array as
            input and returns a new array with all the duplicate elements
            removed. <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function removeDuplicates(arr) {\n\t //Your Code Here\n}\nconst numbers=[2,2,1,4,5,5];\nconst result = removeDuplicates(numbers);\nconsole.log(result);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b>Merge Arrays:</b> Write a function that takes two arrays as input
            and returns a new array that is the combination of the two input
            arrays. <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function merge(arr1, arr2) {\n\t //Your Code Here\n}\nconst numbers1=[2,3,1,4,5];\nconst numbers2=[7,8,9,2,1];\nconst result = merge(numbers1, numbers2);\nconsole.log(result);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b>Find Common Elements:</b> Write a function that takes two arrays
            as input and returns a new array that contains only the common
            elements between the two input arrays. <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function commonElementArr(arr) {\n\t //Your Code Here\n}\nconst numbers=[2,2,3,1,4,5,5];\nconst result = commonElementArr(numbers);\nconsole.log(result);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b>Remove Even Numbers: </b> Write a function that takes an array of
            numbers as input and returns a new array with all the even numbers
            removed. <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function removeEven(arr) {\n\t //Your Code Here\n}\nconst numbers=[2,3,1,4,5];\nconst result = removeEven(numbers);\nconsole.log(result);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b>Find Second Largest Number: </b> Write a function that takes an
            array of numbers as input and returns the second largest number in
            the array.
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function secondLargest(arr) {\n\t //Your Code Here\n}\nconst numbers=[2,3,1,4,5];\nconst result = secondLargest(numbers);\nconsole.log(result);`)
            }}
            >
              Code
            </Button>
          </li>
        </ul>
        <br />
      </div>
      <br />

      <div>
        <b>
          Exercises (Arrays containing Objects, commonly used in interviews):-{" "}
        </b>
        <br />
        Here are some JavaScript exercises that combine arrays and objects to
        help you practice your problem-solving skills: <br /> <br />
        <ul className="list-decimal ml-6 blog-ul">
          <li>
            <b> Array inside object: </b>
            Write a function that takes an array containing objects having keys
            city and country (both strings) and returns an object with country
            as keys and cities as an array of values. e.g input{" "}
            {`[
              { city: "mumbai", country: "india" },
              { city: "chennai", country: "india" },
            ]`}{" "}
            Output:-{" "}
            {`
              { country: "india", cities: ["mumbai", "chennai"] }
            `} <br />
          <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function arrInObj(data) {\n\tconst result = {};\n\tdata.forEach(({ city, country }) => {\n\tif (result[country]) {\n\t\tresult[country].cities.push(city);\n\t} else {\n\t\tresult[country] = { country, cities: [city] };\n\t}\n\t});\n\treturn Object.values(result);\n}\nconst data = [\n\t{ city: "mumbai", country: "india" },\n\t{ city: "chennai", country: "india" },\n\t{ city: "new york", country: "usa" },\n\t{ city: "los angeles", country: "usa" },\n];\nconst result = arrInObj(data);\nconsole.log(JSON.stringify(result));`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b> Average calculation: </b>
            Write a function that takes an array of employee objects as input,
            where each object has a name and age property, and returns the
            average age of all employees.
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function avgAge(arr) {\n\tlet ageSum = 0;\n\tfor(let i=0; i<arr.length; i++){\n\t\tageSum += arr[i].age;\n}\n\t return ageSum/arr.length;\n}\nconst employees = [\n\t{ name: "Rahul", age: 17 },\n\t{ name: "Hitesh", age: 21 },\n\t{ name: "Mukul", age: 28 }\n];\nconst averageAge = avgAge(employees);\nconsole.log(averageAge);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b> Mapping Objects: </b>
            Write a function that takes an array of employee objects as input
            and returns a new array of objects with only the name and age
            properties of each employee.
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function nameAndAgeObj(employees){\n\tconst arr = [];\n\tfor(let i=0; i<employees.length; i++){\n\t\tarr.push({ name: employees[i].name, age: employees[i].age });\n\t}\n\treturn arr;}\nconst employees = [\n\t{ name: "Rahul", age: 17, taskDone: 2 },\n\t{ name: "Hitesh", age: 21, taskDone: 3 },\n\t{ name: "Mukul", age: 28, taskDone: 1 }\n];\nconst newArr = nameAndAgeObj(employees);\nconsole.log(JSON.stringify(newArr));`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            {" "}
            <b> Grouping: </b> Write a function that takes an array of employee
            objects as input, where each object has a name, age, and department
            property, and returns an object where the keys are the department
            names and the values are arrays of employee objects in that
            department.
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function group(employees){\n\t/*Your Code Here*/\n}\nconst employees = [\n\t{ name: "Rahul", age: 17, department: "CSE" },\n\t{ name: "Hitesh", age: 21, department: "ECE" },\n\t{ name: "Mukul", age: 28, department: "CSE" }\n];\nconst newArr = group(employees);\nconsole.log(JSON.stringify(newArr));`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            {" "}
            <b>Count Occurrences: </b> Write a function that takes an array of
            strings as input and returns an object where the keys are the unique
            strings in the array and the values are the number of times each
            string appears in the array.
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function countOccurrences(arr) {\n\t //Your Code Here\n}\nconst arr1=["Rahul","Jaspreet","Kamal"];\nconst result = countOccurrences(arr1);\nconsole.log(JSON.stringify(result));`)
            }}
            >
              Code
            </Button>
          </li>

          <li>
            <b> Filter Objects: </b> Write a function that takes an array of
            objects as input and a property name as a parameter. The function
            should return a new array of objects that only contain the objects
            with a truthy value for the specified property.
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function group(employees, prop){\n\t/*Your Code Here*/\n}\nconst employees = [\n\t{ name: "Rahul", hasID: false },\n\t{ name: "Hitesh", hasID: true },\n\t{ name: "Mukul", hasID: true }\n];\nconst newArr = filterObj(employees, 'haveID');\nconsole.log(JSON.stringify(newArr));!');`)
            }}
            >
              Code
            </Button>
          </li>

          <li>
            <b>Find Object: </b>
            Write a function that takes an array of employee objects as input,
            where each object has a name and age property, and returns the name
            of the oldest employee.
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function findObj(arr) {\n\t/*Your Code here*/\n}\nconst employees = [\n\t{ name: "Rahul", age: 17 },\n\t{ name: "Hitesh", age: 21 },\n\t{ name: "Mukul", age: 28 }\n];\nconst employees = findObj(employees);\nconsole.log(employees);`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            {" "}
            <b> Remove Duplicates:</b> Write a function that takes an array of
            employee objects as input, where each object has a name and age
            property, and returns a new array with all the duplicate employee
            objects removed.
            <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function removeDuplicates(arr) {\n\t/*Your Code here*/\n}\nconst employees = [\n\t{ name: "Rahul", age: 17 },\n\t{ name: "Rahul", age: 17 },\n\t{ name: "Mukul", age: 28 }\n];\nconst employees = removeDuplicates(employees);\nconsole.log(JSON.stringify(employees));`)
            }}
            >
              Code
            </Button>
          </li>
          <li>
            <b>Average and Grouping:</b> Write a function that takes an array of
            employee objects as input, where each object has a name, age,
            department, and salary property, and returns an object where the
            keys are the department names and the values are the average salary
            of all employees in that department. <br />
            <Button
            startIcon = {<CodeIcon />}
            variant="contained"
            color="secondary"
            style={{backgroundColor: "#FF1493"}}
            onClick={()=>{
              openModal()
              setContent(`function avgAndGroup(employees){\n\t/*Your Code Here*/\n}\nconst employees = [\n\t{ name: "Rahul", age: 17, department: "CSE", salary: 15000 },\n\t{ name: "Hitesh", age: 21, department: "ECE", salary: 57000 },\n\t{ name: "Mukul", age: 28, department: "CSE", salary: 10000 }\n];\nconst newArr = avgAndGroup(employees);\nconsole.log(JSON.stringify(newArr));`)
            }}
            >
              Code
            </Button>
          </li>
        </ul>
        <br />
        Tips:- Approach each problem by defining the problem, determining the
        required operations, creating the array or object, populating the array
        or object, performing the operations, checking the output, optimizing
        the code, and refactoring the code. <br /> With practice, you'll become
        more proficient in using arrays and objects together to solve problems
        in JavaScript.
      </div>

      <br />

      <br />
      <Modal
        modalClassName="problem-solving"
        showModal={showModal}
        cancelHandler={closeModal}
        content={<Editor content={content} editorClass="w-100" />}
        maxWidth
      ></Modal>
      <div>
        I'm sure, after knowing above concepts properly you can improve your
        problem solving skills. Start solving the problems.
        <br /> <br />
        Do you've solutions ready for all the problems? Submit your Pull Request
        here,{" "}
        <a
          className="text-black underline"
          href="https://github.com/SkillRazr/js_problem_solving"
        >
          JS Problem Solving
        </a>
      </div>
    </div>
  );
};

export default JsProblemSolving;
