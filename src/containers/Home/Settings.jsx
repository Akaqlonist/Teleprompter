import React from "react";

import styled from "styled-components";
import Slider from "rc-slider";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import "rc-slider/assets/index.css";

const PageContainer = styled.div`
  left: -200px;
  background-color: #8ea7dd;
  flex: 1;
`;
const InputTextArea = styled.textarea`
  width: 95%;
  height: 90%;
  margin: 5px;
  resize: none;
  margin-bottom: 50px;

  font-size: 14px;
  font-family: SF-Pro-Display;

  outline: none;
  &:hover {
    outline: none;
  }
`;
const RoundButton = styled.button`
  position: absolute;
  transform: translate(-105%, -2px);

  border-radius: 100px !important;
  background-color: #8ebee9;
  color: black;
  border: none;
  font-size: 9px;

  &:hover {
    background-color: #6bb4ef;
  }
`;
const RowSlider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 20px;
`;

const MirrorContrast = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const LogoImage = styled.img`
  width: 70%;
  margin-bottom: 20px;
`;
const LogoButton = styled.button`
  width: 20%;
`;
const Label = styled.span`
  width: 20%;
  margin-right: 20px;
  text-align: right;

  font-size: 12px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

const CustomSlider = styled(Slider)`
  width: 100px;
`;

const prompterStart = function (e) {
  console.log("Prompter started");
};

const SettingsPage = ({
  setFullScreen,
  previewContent,
  setPreviewContent,
  setFontSize,
  fontSize,
  setWindowWidth,
  windowWidth,
  setMirrorMode,
  isMirrorMode,
  setDarkMode,
  isDarkMode,
  setJustifyText,
  isJustifyText,
}) => {
  return (
    <PageContainer>
      <div style={{ position: "relative", height: "50%" }}>
        <InputTextArea
          className="input-container"
          onChange={(e) => setPreviewContent(e.target.value)}
          value={previewContent}
        ></InputTextArea>
      </div>

      <LogoImage src={process.env.PUBLIC_URL + "/assets/image/banner.jpg"} />

      <RowSlider>
        <Label>Font Size</Label>
        <CustomSlider
          min={21}
          max={80}
          defaultValue={fontSize}
          onChange={(e) => setFontSize(e)}
        />
      </RowSlider>

      <RowSlider>
        <Label>Width</Label>
        <CustomSlider
          min={20}
          max={100}
          defaultValue={windowWidth}
          onChange={(e) => setWindowWidth(e)}
        />
      </RowSlider>

      <MirrorContrast>
        <label>
          <Checkbox
            checked={isJustifyText}
            onChange={(e) => setJustifyText(e.target.checked)}
          />
          <span
            style={{
              marginLeft: 8,
              marginRight: 30,
              fontSize: 12,
              userSelect: "none",
            }}
          >
            Justify Text
          </span>
        </label>

        <label>
          <Checkbox
            checked={isMirrorMode}
            onChange={(e) => setMirrorMode(e.target.checked)}
          />
          <span
            style={{
              marginLeft: 8,
              marginRight: 30,
              fontSize: 12,
              userSelect: "none",
            }}
          >
            Mirror
          </span>
        </label>

        <label>
          <Checkbox
            checked={isDarkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <span style={{ marginLeft: 8, userSelect: "none", fontSize: 12 }}>
            Dark Mode
          </span>
        </label>
      </MirrorContrast>

      <LogoButton onClick={() => setFullScreen(true)}>
        <img
          src={process.env.PUBLIC_URL + "/assets/image/start_button.jpg"}
          style={{ width: "100%" }}
        />
      </LogoButton>

      {/* <div>
        <input type="radio" id="mirror-false" name="mirror"></input>
        <label for="mirror-false">Normal</label>
        <input type="radio" id="mirror-true" name="mirror"></input>
        <label for="mirror-true">Mirrored</label>
      </div>

      <div>

        <input
          type="radio"
          id="contrast-false"
          name="contrast"
          checked={1}
          onClick={() => setDarkMode(true)} //Radio Button true
        />
        <label for="contrast-false">Dark Mode</label>
        <input
          type="radio"
          id="contrast-true"
          name="contrast"
          onClick={() => setDarkMode(false)} //Radio Button false
        />
        <label for="contrast-true">Light Mode</label>
      </div> */}
    </PageContainer>
  );
};

export default SettingsPage;
