/* eslint-disable no-console */
import { useState, useEffect } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink, useParams } from "react-router-dom";
import useScript from "../hooks/useScript";
import useLink from "../hooks/useExternalCssLink";
import { Button } from "@mui/material";
import ModalDialog from "./Modal";
import JsStarter1 from "../components/blogs/JsStarter1";
import Communication from "../components/blogs/Communication";
import JsProblemArray from "../components/blogs/JsProblemArray";

import blogs from "../data/blogs";

let isMochaLoaded = false;

const RenderTestCoverageContent = (props: any) => {
  const { blog } = props;
  const chaiStatus = useScript("https://unpkg.com/chai/chai.js");
  const mochaStatus = useScript("https://unpkg.com/mocha/mocha.js");
  useLink("https://unpkg.com/mocha/mocha.css");
  const [showTestDialog, setShowTestDialog] = useState(false);

  const handleDialogClose = () => {
    setShowTestDialog(false);
  };

  if (!isMochaLoaded && chaiStatus === "ready" && mochaStatus === "ready") {
    window.mocha.setup("bdd");
    window.mocha.checkLeaks();
    isMochaLoaded = true;
  }

  const setUpTests1 = () => {
    mocha.suite.suites = [];
    const expect = chai.expect;

    describe("deliverableItems()", function () {
      let deliverableItems = (user: any, inventory: any, day: string): any => {
        return {};
      };

      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      it("should return error with message Insufficient Balance!", () => {
        const user = {
          walletBalance: 10,
          subscriptions: [
            { id: "apple", price: 40, quantity: 2, days: [days[0], days[2]] },
            {
              id: "mango",
              price: 20,
              quantity: 1,
              days: [days[3], days[2], days[4]],
            },
          ],
        };
        const inventory = [
          { id: "mango", quantity: 20 },
          { id: "apple", quantity: 50 },
        ];
        const day = days[0];

        const result = deliverableItems(user, inventory, day);
        expect(result.type).to.equal("error");
        expect(result.message).to.equal("Insufficient Balance!");
      });

      it("should return error with message Sorry, some of items are not available!", () => {
        const user = {
          walletBalance: 100,
          subscriptions: [
            { id: "apple", price: 40, quantity: 2, days: [days[0], days[2]] },
            {
              id: "mango",
              price: 20,
              quantity: 1,
              days: [days[3], days[2], days[4]],
            },
          ],
        };
        const inventory = [
          { id: "mango", quantity: 20 },
          { id: "apple", quantity: 1 },
        ];
        const day = days[0];

        const result = deliverableItems(user, inventory, day);
        expect(result.type).to.equal("error");
        expect(result.message).to.equal(
          "Sorry, some of items are not available!"
        );
      });

      it("should return success with subscribed items for the given day", () => {
        const user = {
          walletBalance: 100,
          subscriptions: [
            { id: "apple", price: 40, quantity: 2, days: [days[0], days[2]] },
            {
              id: "mango",
              price: 20,
              quantity: 1,
              days: [days[3], days[2], days[4]],
            },
          ],
        };
        const inventory = [
          { id: "mango", quantity: 20 },
          { id: "apple", quantity: 40 },
        ];
        const day = days[2];

        const result: any = deliverableItems(user, inventory, day);
        expect(result.type).to.equal("success");
        expect(result.items.length).to.equal(2);
        expect(result.items[0].quantity).to.equal(2);
        expect(result.items[1].quantity).to.equal(1);
      });
    });
  };

  const setUpTests2 = () => {
    mocha.suite.suites = [];
    const expect = chai.expect;

    describe("deliverableItems()", function () {
      let deliverableItems = (user: any, inventory: any, day: string) => {
        const findSubscribedItemsForTheDay = (items: any, day: string) => {
          let result = [];

          for (let i = 0; i < items.length; i++) {
            if (items[i].days.includes(day)) {
              result.push(items[i]);
            }
          }
          return result;
        };

        const itemsSubscribed = findSubscribedItemsForTheDay(
          user.subscriptions,
          day
        );
        let totalCost = 0;

        itemsSubscribed.forEach((item) => {
          totalCost += item.price * item.quantity;
        });

        // check enough balance in wallet
        if (totalCost > user.walletBalance) {
          return { type: "error", message: "Insufficient Balance!" };
        }

        // check inventory

        const isAvailable =
          itemsSubscribed.filter((subItem) => {
            const itemInventory = inventory.find(
              (invItem: any) => invItem.id === subItem.id
            );

            if (itemInventory && itemInventory.quantity >= subItem.quantity) {
              return true;
            } else {
              return false;
            }
          }).length === itemsSubscribed.length;

        if (!isAvailable) {
          return {
            type: "error",
            message: "Sorry, some of items are not available!",
          };
        }

        return { type: "success", items: itemsSubscribed };
      };
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      it("should return error with message Insufficient Balance!", () => {
        const user = {
          walletBalance: 10,
          subscriptions: [
            { id: "apple", price: 40, quantity: 2, days: [days[0], days[2]] },
            {
              id: "mango",
              price: 20,
              quantity: 1,
              days: [days[3], days[2], days[4]],
            },
          ],
        };
        const inventory = [
          { id: "mango", quantity: 20 },
          { id: "apple", quantity: 50 },
        ];
        const day = days[0];

        const result = deliverableItems(user, inventory, day);
        expect(result.type).to.equal("error");
        expect(result.message).to.equal("Insufficient Balance!");
      });

      it("should return error with message Sorry, some of items are not available!", () => {
        const user = {
          walletBalance: 100,
          subscriptions: [
            { id: "apple", price: 40, quantity: 2, days: [days[0], days[2]] },
            {
              id: "mango",
              price: 20,
              quantity: 1,
              days: [days[3], days[2], days[4]],
            },
          ],
        };
        const inventory = [
          { id: "mango", quantity: 20 },
          { id: "apple", quantity: 1 },
        ];
        const day = days[0];

        const result = deliverableItems(user, inventory, day);
        expect(result.type).to.equal("error");
        expect(result.message).to.equal(
          "Sorry, some of items are not available!"
        );
      });

      it("should return success with subscribed items for the given day", () => {
        const user = {
          walletBalance: 100,
          subscriptions: [
            { id: "apple", price: 40, quantity: 2, days: [days[0], days[2]] },
            {
              id: "mango",
              price: 20,
              quantity: 1,
              days: [days[3], days[2], days[4]],
            },
          ],
        };
        const inventory = [
          { id: "mango", quantity: 20 },
          { id: "apple", quantity: 40 },
        ];
        const day = days[2];

        const result: any = deliverableItems(user, inventory, day);
        expect(result.type).to.equal("success");
        expect(result.items.length).to.equal(2);
        expect(result.items[0].quantity).to.equal(2);
        expect(result.items[1].quantity).to.equal(1);
      });
    });
  };

  const runTests1 = () => {
    try {
      setShowTestDialog(true);
      setTimeout(() => {
        setUpTests1();
        mocha.cleanReferencesAfterRun(false);
        mocha.run();
      }, 100);
    } catch (e) {
      console.log("error while running mocha", e);
      window.location.reload();
    }
  };

  const runTests2 = () => {
    try {
      setShowTestDialog(true);
      setTimeout(() => {
        setUpTests2();
        mocha.cleanReferencesAfterRun(false);
        mocha.run();
      }, 100);
    } catch (e) {
      console.log("error Mocha run1", e);
      window.location.reload();
    }
  };

  return (
    <div className="text-xl flex flex-col items-center w-full">
      <h1 className="text-4xl pt-4 pb-8">{blog.title}</h1>
      <img
        alt="unit testing"
        src="https://images.unsplash.com/photo-1576444356170-66073046b1bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        loading="lazy"
        role="presentation"
        width="700"
        height="467"
      ></img>
      <div className="flex justify-center m-auto">
        <span className="mr-1 text-sm">Photo by Ferenc Almasi </span>{" "}
        <a
          href="https://unsplash.com/?utm_source=medium&utm_medium=referral"
          className="text-sm"
        >
          Unsplash
        </a>{" "}
      </div>
      <br />

      <div className="text-2xl w-full my-4">Unit Tests</div>
      <div className="my-4 w-full">
        Unit tests is writing test cases to validate units of code.
      </div>
      <div className="mt-2">
        Good working software often consists of statements, methods, classes and
        modules. Code is kept in units for better organisation, readability and
        maintenability and for testability where smaller units of code can be
        tested easily. Code is often subject to changes. Code is refactored to
        maintain quality and new changes introduced to release new feautures or
        fix existing bugs. Unit tests plays an important role to catch bugs
        introduced because of these. Test cases ensure the code is working as
        expected. Once unit tests are written, developers can introduce new
        changes to code confidently, as they can run the unit test scenarios to
        catch bugs if any. Mostly developers who code the program write unit
        tests.
      </div>

      <div className="my-4">
        In this article we'll write unit tests for a real world scenario. <br />{" "}
        <br />
        We need a utility function that will be used in one App{" "}
        <span className="italic">Grocery Daily </span>, to deliver items a
        customer has subscribed for a given day. This function receives 3 input
        parameters namely user (an object), inventory (an array of objects) and
        day a string and returns an object with a property named type whose
        values can be 'success' or 'error' and with additional properties, data
        an array of items in case of success or reason of an error in case of
        any error.
        <br /> <br />
        <span className="italic">
          Criterias :- <br />
        </span>
        User object will have atleast below properties:- <br />
        1. Subscriptions with arrays of objects with itemId, itemQuantity and
        subscribed days array. <br />
        2. wallet balance (available amount) <br /> <br />
        When inventory is empty or partially available, you can return 'Sorry,
        items not available' and keep users wallet balance intact. <br />
        When no items subscribed for a particular day, return a message 'No
        items subscribed today!' <br />
        Finally return the subscribed items, assuming we've covered all the
        cases. <br />
        Write a function in JavaScript to implement the above requirements.
        {/* Next steps:- If subscribed itmes are available partially, return the available items, deduct amount accordingly. */}
        <br /> <br />
        <div className="text-2xl my-8 w-full">TDD</div>
        Let's write code to meet this above requirement. We'll write proper unit
        tests that ensures our code is working as expected. For this we'll use
        TDD(Test Driven Development). In TDD process, we write the test cases
        first before writing a single line of code.
        <div className="mt-2">
          Here we are using{" "}
          <a
            className="text-xl underline"
            href="https://mochajs.org/"
            target={"_blank"}
            rel="noreferrer"
          >
            Mocha
          </a>{" "}
          A test framework that helps to run our test cases in the browser.
          Later we' ll run our test cases right here in this page and see the
          results of the test run. We'll also need an assertion library, that'll
          help us write better assertion statements. e.g
          expect(1+1).to.equal(2). We'll be using{" "}
          <a
            href="https://www.chaijs.com/"
            className="text-xl underline"
            rel="noreferrer"
            target={"_blank"}
          >
            Chai.
          </a>
        </div>
        <div className="my-2">
          There are many frameworks and assertion libraries but we've picked
          Mocha and Chai to run the test cases on the browser.
        </div>
      </div>

      <div className="w-full mt-2">
        {/* style="white-space: pre-wrap; background: lightgray;" */}
        <div className="my-4">
          Here goes our first unit test, with following test case in mind.
        </div>
        User has wallet balance of 10 coins. User has subscribed Apples of
        quantity 2 at price 40 coins each for Sun and Tue and Mangoes of
        quantity 1 at price 20 coins for Tue, Wed and Thu. Inventry has enough
        items. For Sun (Sunday) the method should return error message
        'Insufficient Balance!'. We're adding a top level 'describe' block for
        the function and write each test scenerio in an 'it' block.
        <pre className="p-4 my-8 rounded bg-gray-200 overflow-auto">
          <code className="p-4 whitespace-pre-wrap">
            {`describe('deliverableItems()', function () {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // should be imported from constants file

        it('should return error with message Insufficient Balance!', () => {
            const user = {
                walletBalance: 10,
                subscriptions: [{ id: 'apple', price: 40, quantity: 2, days: [days[0], days[2]] },
                { id: 'mango', price: 20, quantity: 1, days: [days[2], days[3], days[4]] }]
            };
            const inventory = [{ id: 'mango', quantity: 20 }, { id: 'apple', quantity: 50 }];
            const day = days[0];
                
            const result = deliverableItems(user, inventory, day);
            expect(result.type).to.equal("error");
            expect(result.message).to.equal("Insufficient Balance!");
        });
   }
`}
          </code>
        </pre>
        <div>
          Notice how we've kept the test data specific to match the test case
          inside the "it" block. We isolate test data that is specific to a test
          inside it's "it" block. Any common data that is used in all "it"
          blocks is kept at the top "describe" block.{" "}
        </div>
        <div className="my-2">
          {" "}
          Let's code the function so that it can be invoked in the tests, for
          now just a function that returns an empty object and no logic.
        </div>
        <pre className="p-4 my-8 rounded bg-gray-200 whitespace-pre-wrap overflow-auto">
          <code>
            {`let deliverableItems = (user, inventory, day) => ({});`}
          </code>
        </pre>
        <div>Let's add other test cases as well.</div>
        <pre className="p-4 my-8 rounded bg-gray-200 overflow-auto">
          <code className="p-4 whitespace-pre-wrap">
            {`
                
it('should return error with message Sorry, some of items are not available!', () => {
    const user = {
        walletBalance: 100,
        subscriptions: [{ id: 'apple', price: 40, quantity: 2, days: [days[0], days[2]] },
        { id: 'mango', price: 20, quantity: 1, days: [days[3], days[2], days[4]] }]
    };
    const inventory = [{ id: 'mango', quantity: 20 }, { id: 'apple', quantity: 1 }];
    const day = days[0];

    const result = deliverableItems(user, inventory, day);
    expect(result.type).to.equal("error");
    expect(result.message).to.equal("Sorry, some of items are not available!");
});

it('should return success with subscribed items for the given day', () => {
    const user = {
        walletBalance: 100,
        subscriptions: [{ id: 'apple', price: 40, quantity: 2, days: [days[0], days[2]] },
        { id: 'mango', price: 20, quantity: 1, days: [days[3], days[2], days[4]] }]
    };
    const inventory = [{ id: 'mango', quantity: 20 }, { id: 'apple', quantity: 40 }];
    const day = days[2];

    const result = deliverableItems(user, inventory, day);
    expect(result.type).to.equal("success");
    expect(result.items.length).to.equal(2);
    expect(result.items[0].quantity).to.equal(2);
    expect(result.items[1].quantity).to.equal(1);
});
                        `}
          </code>
        </pre>
        <div className="my-4">
          With no logic in the function's body, all test cases inside the test
          suite will fail.{" "}
        </div>
        <div className="my-4">
          Time to run our unit tests! Click Run Tests, behind the scene it
          registers the test cases in the test suite and instructs Mocha to run
          the suite and we get a nice report.
          <span className="italic"> Let's Run!</span>
        </div>
        <Button
          variant="contained"
          onClick={runTests1}
          className="text-xl !my-8 !block"
        >
          Run Tests
        </Button>
        <div className="my-4">
          {" "}
          All failed! It was supposed to fail. Let's fix all the test cases by
          writing the logic for the function.{" "}
        </div>
        <div className="my-2">
          {" "}
          While writing the code for the function we try to fix all the test
          cases. When the test cases are valid and completely cover all the
          scenarios, writing code to pass all the test cases completes our
          initial coding task.
        </div>
        <pre className="p-4 my-8 rounded bg-gray-200 whitespace-pre-wrap overflow-auto">
          <code>
            {`const deliverableItems = (user, inventory, day) => { 
    const findSubscribedItemsForTheDay = (items, day) => {
        let result = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].days.includes(day)) {
                result.push(items[i]);
            }
        }
        return result;
    }
    
    const itemsSubscribed = findSubscribedItemsForTheDay(user.subscriptions, day);

    // no items subscribed today
    if (itemsSubscribed.length === 0) {
        return {type: 'error', message: 'No items subscribed today!'}
    } 

    let totalCost = 0;

    itemsSubscribed.forEach((item) => {
        totalCost += item.price * item.quantity;
    });

    // check enough balance in wallet
    if (totalCost > user.walletBalance) {
        return {type: 'error', message: "Insufficient Balance!" };
    }

    // check inventory 

    const isAllAvailable = itemsSubscribed.filter((subItem) => {
        const itemInInventory = inventory.find((invItem) => invItem.id === subItem.id);

        if (itemInInventory && itemInInventory.quantity >= subItem.quantity) {
            return true;
        } else {
            return false;
        }
    }).length === itemsSubscribed.length;

    if (!isAllAvailable) {
        return {type: 'error', message: "Sorry, some of items are not available!" };
    }

    return {type: 'success', items: itemsSubscribed };
}`}
          </code>
        </pre>
        <div>
          Now run tests to see test results again. This time all should pass. We
          should see the existing failures in{" "}
          <span className="text-red-500">Red</span> becoming{" "}
          <span className="text-green-500">Green</span>.
        </div>
        <Button
          variant="contained"
          onClick={runTests2}
          className="text-xl !my-8"
        >
          Run Tests
        </Button>
        <div className="my-4">
          Once all tests pass, it's time to refactor the code to improve
          readability by following standard coding practices. As we keep
          changing the code, we run the test cases to detect potenital bugs.{" "}
        </div>
        <div>
          <span className="font-extrabold">We've missed one test case</span>,
          when user has no subscribed items for a given day, it's returning the
          desired message, but there's no test case to validate that. As a
          program has many statements, functions, condtional statements
          resulting in multiple branches and control flows without a code
          coverage report chances of missing such test cases are more.
        </div>
        <div className="text-2xl  my-8">Code Coverage</div>
        <div>
          It's a metric to measure how much code is covered while tests are run
          against the code. A code coverage report highlights number of
          statements, functions, branches the test covered and helps in
          detecting missing tests that should be added. In this article we're
          not using any library to measure the code coverage. There are many
          popular libraries out there and it's fairly simple to add it to a
          testing framework.
        </div>
        <div className="text-2xl  my-8">Industry Insights </div>
        <div>
          To demonstrate unit tests we've used Mocha on a Browser. But it's
          convenient to use a Node process to run the unit tests in case of
          JavaScript based environments. Most frameworks run it on watch mode,
          whenever there is a change in code, unit tests are run automatically.
          Also it's integrated with the code commits and CICD work flows where
          tests are triggered before code is committed or deployed to
          production.
        </div>
        <div className="my-4">
          That's all about Unit Tests and Code Coverage. In our next article
          we'll discuss about how Unit Testing is not enough and how Integration
          Tests help.
        </div>
      </div>
      <ModalDialog
        showModal={showTestDialog}
        setShowDialog={setShowTestDialog}
        cancelHandler={handleDialogClose}
        title="Unit Tests"
        content={
          <div className="w-full overflow-auto">
            <div id="mocha" key="1"></div>
          </div>
        }
      />
    </div>
  );
};

export const BlogDetailsPage = () => {
  const { id: blogId } = useParams<string>();
  const blog: any = blogs.find((data) => data.id === blogId);

  const [scrollPosition, setSrollPosition] = useState(0);
  const handleScroll = () => {
    var scrolled_top =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    var to_scroll =
      (document.documentElement.scrollHeight || document.body.scrollHeight) -
      (document.documentElement.clientHeight ||
        document.body.clientHeight ||
        window.innerHeight) -
      338; // height of the footer (338)

    var horizontal_width = (scrolled_top / to_scroll) * 100;

    // if (blogId === 'unit_test_coverage') return;
    setSrollPosition(horizontal_width > 100 ? 100 : horizontal_width);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderTechBlogContent = () => {
    return (
      <div className="text-xl flex flex-col items-center w-full">
        <h1 className="text-4xl pt-4 pb-8">{blog.title}</h1>
        <img
          alt="tech company"
          src="https://miro.medium.com/max/1400/0*HTMQA6QcYq2Z_0YV"
          loading="lazy"
          role="presentation"
          width="700"
          height="467"
        ></img>
        <div className="flex justify-center m-auto">
          <span className="mr-1 text-sm">Photo by Razvan Chisu on </span>{" "}
          <a
            href="https://unsplash.com/?utm_source=medium&utm_medium=referral"
            className="text-sm"
          >
            Unsplash
          </a>{" "}
        </div>
        <br />
        <div className="p-4">
          Every year millions of fresh graduates come out of college in search
          of jobs to start their career. Last 2 decades tech sector is
          significantly hiring fresh graduates who are interested in the tech
          sector. The numbers are increasing year by year and it is hoped it'll
          rise in coming years as well. This post is written to help job seekers
          evaluate different jobs in tech sector and plan accordingly. Not all
          jobs in tech sector are technical in nature. Like other sectors it
          needs skilled employees in different areas to run a business.
          Following are the roles found in most tech companies. Some roles may
          be overlapping where in some companies, one personnel contributes to
          multiple roles.
          <br />
          Before listing all roles, let's highlight the common essential skills
          that are required in a candidate and those help immensely not just
          getting the job but also in the career growth.
          <br /> <br />
          <div className="text-2xl">7 Common Skills :- </div>
          <ul className="p-2">
            <li>
              {" "}
              1. Excellent interpersonal skills, team player, being a
              collaborator.
            </li>
            <li> 2. Good written and verbal communication skills.</li>
            <li>
              {" "}
              3. Motivated to learn new things and aware of best practices and
              standards, staying up-to-date with field specific tools, and
              trends.
            </li>
            <li> 4. The drive to excel at the job.</li>
            <li>
              {" "}
              5. Ability to do analysis, research and document the findings.
            </li>
            <li>
              {" "}
              6. Strong time management, estimation and organisational
              abilities.
            </li>
            <li>
              {" "}
              7. Strong computer skills, maintenance of existing systems.
            </li>
          </ul>
          <br /> <br />
          Here goes the roles…
          <img
            alt="team"
            className="flex justify-center m-auto"
            src="https://miro.medium.com/max/1400/0*IBqhXtoLqo4KURCu"
            loading="lazy"
            role="presentation"
            width="700"
            height="467"
          />
          <div className="flex justify-center m-auto">
            Photo by Jason Goodman on{" "}
            <a
              href="https://unsplash.com/?utm_source=medium&utm_medium=referral"
              className="ml-2"
            >
              {" "}
              Unsplash
            </a>
          </div>
          <br /> <br />
          <div className="text-2xl my-8"> 1. Front End Developer :- </div>
          They work on look and feel of websites/web apps while maintaining it
          functional. They bring life to a design. Primarily they collaborate
          with UX and backend team and other team members. They are very good at
          HTML, CSS, JavaScript, Responsive Design and Problem Solving along
          with good at using popular UI frameworks, libraries, coding best
          practices and web development standards. Development involves writing
          unit tests as well.
          <div className="text-2xl my-8">2. Backend Developer :-</div>
          It involves building backend of a software. They deal with APIs,
          Databases that'll consumed by the UI of the software. They are very
          good at backend languages, related frameworks and libraries, problem
          solving, coding best practices and field specific development
          standards i.e web/mobile etc. They build the infrastructure of the
          software using a solid technical design, keeping availability,
          scalability, security in mind. Development involves unit testing code.
          <div className="text-2xl my-8">3. FullStack Developer :-</div>
          They wear multiple hats. They contribute both in Front end and Backend
          of a system. They are familiar with technologies used in both the
          stacks. Even though it's difficult to keep up with a specific tech
          stack, sometimes instead of focusing only one stack it pays, knowing
          both the stacks.
          <div className="text-2xl my-8"> 4. Mobile App Developer :- </div>
          They design interfaces and build fully functional mobile applications.
          They collaborate with UX and backend team team members. They are good
          at popular frameworks, libraries used for mobile development.
          Depending on the tech stack their skill set differs. e.g For a
          JavaScript based tech stack they should be very good at HTML, CSS,
          JavaScript, Responsive design and so on. They are good at problem
          solving, coding best practices and mobile development standards.
          Development involves unit testing code.
          <div className="text-2xl my-8">5. Data Engineer :-</div>
          Data plays a big role in business decisions. Data engineers build
          algorithms, systems to process raw, complex, unstructured data
          collected from various sources to meaningful metrics. They are good at
          data processing languages, databases and tools, mathematics and
          statistical methods.
          <div className="text-2xl my-8">6. Automation tester :- </div>
          They design, code testing systems to automate the testing process and
          remove repetition and reduce human efforts. For every release of
          software manually testing whole application is hard and consumes a lot
          of time, by automating the testing testing time is saved. Automation
          testers create test plans, identify test cases, setup the testing
          framework and finally add automation tests. Periodically these tests
          are run whenever new code is introduced. Tests are executed, errors
          are captured and reported. In Scrum framework both manual testers and
          automation testers are part of the development team. They also do
          manual testing for the scenarios that can't be automated or difficult
          to automate.
          <div className="text-2xl my-8"> 7. Dev ops :-</div>
          They form the glue between software development and operation. They
          build and setup infrastructure and ensure software runs smoothly in
          different environments. They build tools, processes to convert source
          code to working software that is passed thru various check points,
          like testing stages, checking for vulnerabilities in the code, finally
          deploying it on different environments. Security, logging and
          monitoring, load balancing all are important aspects taken care by Dev
          ops. They ensure code releases, new updates on existing systems, fixes
          go smooth. The role also involves timely review of the existing
          infrastructure and upgrades if needed.
          <div className="text-2xl my-8">8. Product Tech support :-</div>
          They are fully aware of the product, all features with in, how to
          operate it and so on. They assist customers in explaining operating
          instructions, product features and help customers troubleshooting an
          issue. They go thru support tickets/issues raised by customers,
          provide immediate fix when applicable, if it's beyond their ability
          they categorise it and notify respective team to resolve the issue.
          <div className="text-2xl my-8">9. Product Management :- </div>
          Identify customers needs, experimenting and bringing ideas to life.
          Design user centric experiences, building products thru solid
          engineering and product development practices. Works closely with
          designers, engineers, analysts, researchers, marketing and sales team
          to create impactful products. You will constantly create hypotheses
          for improving your product, convince your stakeholders which problems
          are worth solving, help build and test them with users, analyse data,
          learn from the results and propose the next course of action. You'll
          drive business growth by setting ambitious goals and defining a
          comprehensive strategy for your product area. Creates a compelling
          vision and influence colleagues and senior leadership team towards the
          long-term vision. Understanding pain points, identify and prioritise
          opportunities, saying a NO when required. Work closely with all
          related areas to help define and develop the best solutions keeping
          time in mind. Validate ideas by conducting research, performing
          experiments and analysing results. Deep understanding of the industry.
          Works with geographically dispersed teams to get things done. Has
          ability to define product goals and metrics, be analytical and take
          data driven decisions.
          <div className="text-2xl my-8">10. Product Owner :-</div>
          Once product manager creates the vision, product owners role in scrum
          team is to execute the vision. To do that he or she outlines the plan,
          owns team backlog, works closely with stake holders on daily basis.
          <div className="text-2xl my-8">11. Development Manager :-</div>
          Builds and manages the development team and plays a key role in
          managing people, planing the project from inception to release
          ensuring quality. He or she enables the development team to work as
          efficiently as possible and by making sure they have clear goals, both
          short term and long term. He or she owns responsibility for projects
          every stages from inception to release and maintenance. Delegates
          technology and development roles to tech leads in the development
          team. Need to stay abreast of the technical stack used in the product,
          to check that things are being done and enforce standard practices and
          processes if not followed. Since they work closely with the
          development team they mentor and help the team grow in their role and
          periodically evaluate employees performance and share it with HR.
          <div className="text-2xl my-8">12. Scrum master :-</div>
          They are facilitators of scrum to the larger team by ensuring the
          scrum principles and values are practices. He/she is committed to the
          scrum values and practices, protect the team from outside
          distractions. Coach team members. Host daily stand-up meetings. Assist
          the product owner with the product backlog. Remove roadblocks.
          <div className="text-2xl my-8"> 13. Manual testing :-</div>
          It involves writing a test plan. Figuring out what are the different
          use cases of a product by customers and identify various workflows and
          coming up with appropriate test cases for each such scenario. A tester
          should be well versed with various testing strategies, writing a
          comprehensive bug report with steps to reproduce the issue. It should
          talk about the issue in details. Should specify . Any relevant error
          meta data should also be mentioned, screenshots, screencast or network
          recording data etc. Optionally a priority and severity status can also
          be mentioned based on the type of bug and frequency of it's
          appearance. Workflow Testing before a release:- A workflow is a series
          of steps to test a key feature. Before release of a new feature in the
          product, all existing features need to tested going thru the workflows
          along with the new feature to ensure all features in the product work
          fine as one unit.
          <div className="text-2xl my-8"> 14. Content Writing :-</div>
          It involves a lot of research in writing informative and engaging
          articles to help brands showcase their products in a website, blogs
          and press releases and other social channels. The content is generally
          crafted to capture the attention of a particular target audience and
          educate customers. Since it involves a lot of writing, the role needs
          an excellent writing and communication skills so that the content
          consumers get the message clearly without any hassle. Working
          knowledge of content management systems, office applications and SEO
          best practices for web content are also required. On the job they need
          to understand the industry well and also stay relevant to any changing
          dynamics, contributing to marketing campaigns.
          <div className="text-2xl my-8">15. Designer :- </div>
          It involves research to make user-friendly products that are easy to
          use, improving customer experience, find new areas of product growth
          by building better user experience, defining/aligning design system of
          an Org, identifying the gaps in product usability and adaptability and
          fixing them. They build design style for an org, to make various
          products and services align to a common design. They use wireframes,
          storyboards, process flows and sitemaps to illustrate and present
          design ideas. Collaborate with product managers and engineers to
          understand the product before presenting solutions to improve the
          visual and interactive experience. Gather user requirements from
          product managers to create compelling and original graphic designs
          (images, sketches, etc). Build and design user interface elements like
          menus, tabs, widgets, page navigation buttons and search fields.
          knowledge of visual design and wire framing tools like Photoshop,
          Illustrator, etc. Tools:- Experience with wireframes, storyboards, and
          sitemaps
          <div className="text-2xl my-8"> 16. Customer support :-</div>
          Customer support is a field which focuses on providing support and
          services for customers during and after the purchasing process.
          <div className="text-xl my-4"> Who are they?</div>A problem solver,
          quickly determining customer's issues, explaining the best possible
          solution, and ensuring it is being handled in compliance with the
          company's guidelines and policies. Can maintain financial accounts by
          processing customer adjustments. Can collect and analyse customer
          information, and filing documents and paperwork. Must be customer
          oriented, maintaining professionalism through out the job and thus
          converting frustrated customers to repeat customers. Strong
          communication skills accompanied with excellent listening skills and
          patience to have smooth interactions with customers either on call or
          in person Have thorough knowledge of the product or service being
          advertised.
          <div className="text-xl my-8">This role involves:- </div>
          <ul>
            <li>Answering product and service questions.</li>
            <li>Suggesting information about other products and services.</li>
            <li>
              Generating sales leads even if you aren't directly involved with
              selling.
            </li>
            <li>
              Answering telephone calls and transferring to appropriate
              departments based on their queries.
            </li>
            <li>
              Record keeping account information, opening new accounts and
              maintaining accounts by updating information as and when
              necessary.
            </li>
            <li>
              Resolving product or service problems by clarifying the customer's
              complaint after verifying its validity.
            </li>
          </ul>
          <div className="text-2xl my-8">17. Software Security :- </div>
          They ensure a product undergoes software security testing before going
          to market to check its ability to withstand malicious attacks from
          various sources, so that the product continues to function under such
          attacks. They create threat models that are used in different stages
          in the software development, e.g STRIDE.
          https://www.softwaresecured.com/stride-threat-modeling/ The review
          technical documents and designs before the product is implemented
          using STRIDE and other methods. They introduce processes and practices
          to make security an important aspect of software development. They
          routinely identify vulnerabilities in the third party libraries and
          frameworks that are used in the product.
          <div className="text-2xl my-8">18. Legal and compliance :- </div>
          They ensure businesses operate in a legal and ethical manner while
          meeting business objectives. Role involves developing and implementing
          an effective legal compliance program, practices and documents,
          educating and training employees. They draft and revise company
          policies, proactively audit processes, practices and documents to
          identify weaknesses. They evaluate business activities (e.g.
          investments) to assess compliance risk, collaborate with external
          auditors and HR when needed, set plans to manage a crisis or
          compliance violation, educate and train employees on regulations and
          industry practices, address employee concerns or questions on legal
          compliance and finally keep abreast of internal standards and business
          goals.
          <div className="text-2xl my-8"> 19. Marketing and Sales :- </div>
          They play a vital role in promoting the business, product or service
          through brand awareness, brand image, keep information regarding
          products available to make discovery of the product easier. Role
          involves developing strategies and tactics to generate new business
          leads, doing marketing research, creating creative marketing
          campaigns, events and content for promotion, managing social media
          handles. Tracking KPIs of marketing campaigns, doing analysis to
          measure performance using several tools, e.g Google Analytics etc.
          They often collaborate with Sales, Customer Support and Product
          management teams.
          <div className="text-2xl my-8"> 20. IT Support :- </div>
          They fix computer systems when they fail, ensure employees have
          working systems most of the times. They procure IT hardware and
          supplies, customise new computer systems according to the org's
          requirement by installing additional software. Maintain IT inventory.
          See video and audio conferencing rooms in working condition. Install
          and configure new printers, copiers and other equipments. Assist new
          users with computers and software issues. Train employees on new
          systems. Keep track of vulnerabilities, software updates and notify
          employees to update the system. Renew software licences, manage
          contracts with suppliers.
          <div className="text-2xl my-8">21. Accounting and Audit :-</div>
          Accountants and auditors prepare and review financial records. They
          are responsible for creating an auditing system that examines and
          tracks inconsistency in data, creates criteria for initiating audits
          and analyses data for reasonable conclusions. Perform inquiries and
          inspection as needed to identify and resolve vulnerabilities in
          existing financial operations, initiate improvement on the same.
          Maintain and cultivate a master inventory businesses policies,
          practices and processes, make recommendations to financial management
          about software, policies and audit triggers. They ensure that
          financial records are accurate and that taxes are paid properly and on
          time. They review financial operations and work to help ensure that
          organisations run efficiently. Compute taxes owed, prepare tax
          returns, and ensure that taxes are paid properly and on time.
          <div className="text-2xl my-8"> 22. HR :-</div>
          HR department is responsible for managing the employee recruitment,
          hiring right candidates following necessary paper work. Onboarding new
          trainees, administering employee benefits, processing payroll and
          handle employee exit process. They conduct events to ensure work life
          balance at job, motivate employees and involve in several activities
          periodically to maintain a healthy workplace, they keep the employees
          satisfied and retain top performers. They play a pivotal role in the
          engagement of employees by ensuring employees have access to the right
          skills, tools, and workspace to feel comfortable. They design HR
          policies, resolve internal conflicts among employees.
          <div className="text-2xl my-8">23. Customer experience :-</div>
          They ensure each touchpoint across the customer journey is engaging
          and effective. They help organisations increase customer satisfaction
          rates, customer loyalty, and help gain more referrals from those loyal
          customers. They instil a customer centric culture, gather feedback
          from customers, understand customer pain points, requirements and make
          them incorporated in timely fashion.
          <div className="text-2xl my-8">24. Social media manager :-</div>
          They provides the voice for a company across social channels. They are
          responsible for managing content, responding to followers on social
          channels. They design and implement social media strategies, create
          social media campaigns to align with business goals and strive to
          increase brand exposure and ensuring high levels of web traffic and
          customer engagement. Collaborate with Marketing, Sales and Product
          Development teams
          <div className="text-2xl my-8">
            25. Administration & Support staff :-
          </div>
          They Ensure that all customer-related tasks are handled accurately and
          on time to improve guests' experience. Administrative Support
          employees assist executives in their everyday activity and ensure that
          business operations are well-organised, essential services are in
          operation. Their duties also include answering telephone calls,
          emails, receiving and directing visitors, word processing, creating
          spreadsheets and presentations, and filing. All above roles are entry
          level roles to give an overall view of the role. Senior positions in
          reach role demands more experience and responsibilities. Typically
          involves mentoring and managing a team with your experience and
          expertise.
          <div className="text-2xl my-8">Disclaimer :-</div>
          In all the above roles we have kept the information minimal to give
          you a basic idea. Do your analysis and spend more time to figure out a
          role of your interest in details. Remuneration and role specific
          educational qualification is deliberately omitted because of the
          reason listed below. We should start believing in the philosophy "Rise
          up with Skills" Most companies specify Bachelors Degree / Masters
          Degree in the particular field for any open positions as requirements.
          But there are companies those value skill over educational
          qualifications and give skilled candidates a fair chance. In the near
          future we hope this becomes the selection criteria as there are ways
          one can get required skills, showcase their skills and are eligible
          for a role without having a relevant educational degrees. That's one
          reason we are not specifying an educational degree as a requirement in
          the above roles, but don't feel dejected if a company rejects your
          application to a role because of lack of required education. Skill is
          the thing not an educational degree. Get skilled, you'll get chances
          to show case your skills. Your Cost To Company (CTC) will depend on
          the company, experience, how good one is at the job and also sometimes
          on the type of role. In each role those who excel well are paid well.
          E.g A designer from a top company is paid significantly higher compare
          to an average software developer and so on. Also CTC is only one
          component, other rewards may include annual bonuses, Restricted Stock
          Units (RSUs) and various employee welfare schemes.
          <div className="text-2xl my-8">Credits :-</div>
          To write this article information from various websites gathered,
          analysed, modified and presented in a format suitable for this
          article. It's not possible to credit all 100's of such sources. A big
          thanks to the Internet, abundance of information. Now it's time to
          take a break! We'll revisit this article periodically and update any
          missing info that'll add value. Thanks for reading, hope this helps!
        </div>{" "}
      </div>
    );
  };

  const renderBlogContent = () => {
    switch (blogId) {
      case "Job_roles_in_tech_company": {
        return renderTechBlogContent();
      }

      case "unit_test_code_coverage": {
        return <RenderTestCoverageContent blog={blog} />;
      }

      case "js_starter": {
        return <JsStarter1 />;
      }

      case "english_communication": {
        return <Communication />;
      }

      case "js_problem_solving_array_object_1": {
        return <JsProblemArray />;
      }

      default: {
        return null;
      }
    }
  };

  return (
    <>
      <div className="fixed text-red-400 z-20 w-full h-2 top-[110px] sm:top-[70px]">
        <div
          style={{
            width: `${scrollPosition}%`,
            height: "2px",
            background: "#ff1493",
          }}
        ></div>
      </div>
      <div className={`flex flex-col w-full mt-10 py-20 px-10 sm:px-20`}>
        <div className="flex items-center flex-col">
          {!blog ? (
            <div className="flex flex-col items-center p-20">
              <span className="text-red-500 text-6xl">
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </span>
              <span className="flex items-center text-2xl text-red-500">
                {" "}
                <ErrorOutlineIcon htmlColor="red" />{" "}
                <span className="ml-1">Blog not found!</span>
              </span>
            </div>
          ) : (
            renderBlogContent()
          )}
          <div className="w-full my-8 text-center pt-6">
            <NavLink to="/blogs">
              <Button variant="outlined">
                <ArrowBackIcon /> Back to Blogs List{" "}
              </Button>{" "}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
