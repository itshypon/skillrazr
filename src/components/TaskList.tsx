// New Code starts here:

import React, { useState, useEffect } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material/";

const TaskList = () => {
  const [topics, setTopics] = useState([
    {
      name: "HTML Concepts",
      subtopics: [
        "Introduction to HTML",
        "HTML Elements and Attributes",
        "HTML Headings and Paragraphs",
        "HTML Links, Images, and Favicons",
        "HTML Tables and Lists",
        "HTML Block and Inline Elements",
        "HTML Forms and Handling",
      ],
      covered: false,
      subtopicsCovered: [false, false, false, false, false, false, false],
    },
    {
      name: "CSS Concepts",
      subtopics: [
        "Introduction to CSS",
        "Block and Inline Elements, Selectors and Combinators",
        "Flexbox, Grid and Responsive Design using CSS",
        "CSS Box Model(Margin and Padding)",
        "CSS Positioning and z-index",
      ],
      covered: false,
      subtopicsCovered: [false, false, false, false, false],
    },
    {
      name: "JavaScript Concepts",
      subtopics: [
        "Primitive data types, var, let, const and scoping",
        "Values Vs References",
        "Objects and Prototype inheritance in JS",
        "Arrays and array methods, iterators",
        "Functions in details, Functions as first class citizens",
        "File Reader and Error Handling",
        "Browser DOM and Memoization",
      ],
      covered: false,
      subtopicsCovered: [false, false, false, false, false, false, false],
    },
    {
      name: "React Concepts",
      subtopics: [
        "React JS Basic Concepts",
        "React Hooks and Custom Hooks in React",
        "React Props and Props Validation",
        "React Constructor and Component API",
        "React Hooks and Redux",
        "React Lists, Keys,Refs, and Fragments",
      ],
      covered: false,
      subtopicsCovered: [false, false, false, false, false, false],
    },
    {
      name: "NodeJs Concepts",
      subtopics: [
        "NPM and Introduction to NodeJs",
        "NPM(Package Manager) and Callbacks Concept",
        "NodeJs Event Loop and Event Emitter",
        "NodeJs Buffers, Streams and File System",
        "NodeJs Utility and Web Modules",
        "NodeJs RESTful API",
      ],
      covered: false,
      subtopicsCovered: [false, false, false, false, false, false],
    },
    {
      name: "ExpressJs Concepts",
      subtopics: [
        "ExpressJs Request and Response",
        "Express Js GET and POST",
        "ExpressJs Routing",
        "ExpressJs Cookies and MiddleWare",
      ],
      covered: false,
      subtopicsCovered: [false, false, false, false],
    },
    {
      name: "MongoDB Concepts",
      subtopics: [
        "Getting Started with MongoDB",
        "Create a Database with MongoDB",
        "Import data to your database",
        "Integrate MongoDB Change Streams with Socket.IO",
        "Build a multi-environment continuous delivery pipeline for MongoDB Atlas",
        "Query from multiple MongoDB databases using MongoDB Atlas Data Lake",
      ],
      covered: false,
      subtopicsCovered: [false, false, false, false, false, false],
    },
  ]);

  const handleTopicChange = (index: any) => {
    const newTopics = [...topics];
    newTopics[index].covered = !newTopics[index].covered;
    setTopics(newTopics);
  };

  const handleSubtopicChange = (topicIndex: any, subIndex: any) => {
    const newTopics = [...topics];
    newTopics[topicIndex].subtopicsCovered[subIndex] =
      !newTopics[topicIndex].subtopicsCovered[subIndex];
    setTopics(newTopics);

    // Storing the updated status in Local Storage
    localStorage.setItem("topics", JSON.stringify(newTopics));
  };

  useEffect(() => {
    const storedTopics = localStorage.getItem("topics");
    if (storedTopics) {
      setTopics(JSON.parse(storedTopics));
    }
  }, []);

  const isTopicComplete = (topic: any) => {
    return topic.subtopicsCovered.every((covered: any) => covered);
  };

  return (
    <div className="pt-10 pb-20">
      <h1 className="text-4xl sm:text-6xl text-center mt-6 pt-20 pb-14">
        Complete Fullstack Developement RoadMap
      </h1>
      <List className="flex flex-col border-2 border-pink-400 rounded-2xl !m-2">
        {topics.map((topic, index) => (
          <div key={index}>
            <ListItem button onClick={() => handleTopicChange(index)}>
              <ListItemIcon>
                {topic.covered ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
              <ListItemText
                primary={topic.name}
                primaryTypographyProps={{
                  style: {
                    fontWeight: "bold",
                    color: isTopicComplete(topic) ? "#FF00BF" : "black",
                  },
                }}
              />
            </ListItem>
            <Collapse in={topic.covered} timeout="auto" unmountOnExit>
              <List className="" component="div" disablePadding>
                {topic.subtopics.map((subtopic, subIndex) => (
                  <ListItem
                    key={subIndex}
                    button
                    onClick={() => handleSubtopicChange(index, subIndex)}
                  >
                    <Checkbox checked={topic.subtopicsCovered[subIndex]} />
                    <ListItemText primary={subtopic} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
