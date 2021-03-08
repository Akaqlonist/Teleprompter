import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

var propTypes = require("prop-types");

const PageContainer = styled.div`
  flex: 1;
  background-color: ${(props) => (props.isDarkMode ? "black" : "white")};
`;

const PreviewPane = styled.textarea`
  background-color: ${(props) => (props.isDarkMode ? "black" : "white")};
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
  font-size: ${(props) => props.fontSize + "px"};
  ${(props) => (props.isMirrorMode ? "transform: scale(-1, 1)" : "")};
  width: ${(props) => props.windowWidth + "%"};
  text-align: ${(props) => (props.isJustifyText ? "justify" : "")};
  text-justify: inter-w;

  position: relative;
  top: ${(props) => props.topY + "px"};

  font-family: Google Sans;

  height: 100%;
  border: none;
  overflow: hidden;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;

  cursor: default;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  pointer-events: none;

  &:hover {
    outline: none;
  }
`;

const PreviewPage = ({
  setFullScreen,
  fullScreen,
  content,
  fontSize,
  windowHeight,
  windowWidth,
  isMirrorMode,
  isDarkMode,
  isJustifyText,
}) => {
  const [scrollSpeed, setScrollSpeed] = useState(10);
  const [topY, setTopY] = useState(0);
  const [scrollStarted, setScrollStarted] = useState(false);
  const scrollInterval = useRef(0);

  const timerFunction = () => {
    setTopY((topY) => topY - 1);
  };

  const keyFunction = useCallback((event) => {
    if (event.keyCode === 27 && fullScreen) {
      clearInterval(scrollInterval.current);
      setFullScreen(false);
    }
    if (event.keyCode === 32 && fullScreen) {
      if (scrollStarted == false) {
        scrollInterval.current = setInterval(timerFunction, 20);
      } else {
        clearInterval(scrollInterval.current);
      }
      setScrollStarted((prev) => !prev);
      // console.log("First " + scrollStarted);
      // setTimeout(() => {
      //   setScrollStarted(true);
      //   console.log("Second " + scrollStarted);
      // }, 100);
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", keyFunction);
    return () => {
      document.removeEventListener("keydown", keyFunction);
    };
  });

  return (
    <PageContainer isDarkMode={isDarkMode}>
      <PreviewPane
        spellCheck={false}
        isMirrorMode={isMirrorMode}
        isDarkMode={isDarkMode}
        isJustifyText={isJustifyText}
        fontSize={fontSize}
        windowWidth={windowWidth}
        value={content}
        topY={topY}
      />
    </PageContainer>
  );
};

PreviewPage.propTypes = {
  content: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  windowHeight: PropTypes.number,
  windowWidth: PropTypes.number,
  isMirrorMode: propTypes.bool,
  isDarkMode: propTypes.bool,
  isJustifyText: propTypes.bool,
  topY: propTypes.number,
};

export default PreviewPage;
