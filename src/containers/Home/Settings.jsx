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
	width: 98%;
	height: 95%;
	margin: 5px;
	resize: none;
	margin-bottom: 50px;

	font-size: 16px;
	font-family: SF-Pro-Display;

	outline: none;
	&:hover {
		outline: none;
	}
`;
const LogoImage = styled.img`
	width: 85%;
	margin-bottom: 20px;
	@media (max-width: 600px){
		width: 100%;
	}

	cursor: pointer;
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
	margin-right: 70px;
	margin-left: 30px;
`;

const iqlo_Checkbox = styled(Checkbox)``;

const OptionSpan = styled.span`
	text-align: center;
	margin-right: 15px;
	margin-left: 15px;
	user-select: none;
	font-size: 12px;
`;

const MirrorContrast = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	margin-top: 20px;
`;
const LogoButton = styled.input`
	width: 180px;
`;
const Label = styled.span`
	flex: 2;
	width: 20%;
	text-align: right;

	font-size: 14px;
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none;
`;

const CustomSlider = styled(Slider)`
	flex: 7;
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
	const toggleFullscreen = () => {
		const removeLineCount = parseInt(window.innerHeight / (fontSize * 6.8));
		let updatedContent = previewContent;
		let shouldInserted = "";
		for (let i = 0; i < removeLineCount; i++) shouldInserted += "\n";
		setPreviewContent(shouldInserted + updatedContent + shouldInserted);
		setFullScreen(true);
	};
	return (
		<PageContainer>
			<div style={{ position: "relative", height: "45%" }}>
				<InputTextArea
					title="This content will be rendered at preview pane in the right."
					onChange={(e) => setPreviewContent(e.target.value)}
					value={previewContent}
				></InputTextArea>
			</div>

			<LogoImage
				onClick={() => window.open("https://www.eyedirect.tv/purchase")}
				src={process.env.PUBLIC_URL + "/assets/image/banner.jpg"}
			/>

			<RowSlider>
				<Label>Font Size</Label>
				<div style={{ flex: 1 }} />
				<CustomSlider
					min={10}
					max={40}
					defaultValue={fontSize}
					onChange={(e) => setFontSize(e)}
				/>
			</RowSlider>

			<RowSlider>
				<Label>Width</Label>
				<div style={{ flex: 1 }} />
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
						style={{ display: "block" }}
						checked={isJustifyText}
						onChange={(e) => setJustifyText(e.target.checked)}
					/>
					<OptionSpan>Justify Text</OptionSpan>
				</label>

				<label>
					<Checkbox
						style={{ display: "block" }}
						checked={isMirrorMode}
						onChange={(e) => setMirrorMode(e.target.checked)}
					/>
					<OptionSpan>Mirror</OptionSpan>
				</label>

				<label>
					<Checkbox
						style={{ display: "block" }}
						checked={isDarkMode}
						onChange={(e) => setDarkMode(e.target.checked)}
					/>
					<OptionSpan>Dark Mode</OptionSpan>
				</label>
			</MirrorContrast>
			<LogoButton
				onClick={() => toggleFullscreen()}
				type="image"
				src={process.env.PUBLIC_URL + "/assets/image/start_button.jpg"}
			/>

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
