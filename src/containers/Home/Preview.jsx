import React, {
	useCallback,
	useEffect,
	useState,
	useRef,
	useMemo,
	useLayoutEffect,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Slider from "rc-slider";

var propTypes = require("prop-types");

const PageContainer = styled.div`
	flex: 1;
	background-color: ${(props) => (props.isDarkMode ? "black" : "white")};
`;

const State = styled.div`
	flex: 1;
	margin-left: 10px;
	margin-tip: 5px;
	margin-right: 5px;
`;
const StateSpan = styled.span`
	display: block;
	font-size: 12px;
	color: white;
`;

const StateIcon = styled.i`
	font-size: 20px;
`;

const ScrollSpeedSlider = styled(Slider)`
	flex: 15;
	top: 5px;

	margin-right: 100px;
	.rc-slider-mark-text {
		font-size: 15px;
		color: white;
		top: -3px;
	}
	.rc-slider-mark-text-active {
		color: black;
	}
`;

const ControlPanel = styled.div.attrs((props) => ({
	style: {
		display: props.fullScreen ? "flex" : "none",
	},
}))`
	position: relative;
	width: 100%;
	height: 40px;
	z-index: 2;

	background-color: #737373;
`;

const PreviewPane = styled.textarea.attrs((props) => ({
	style: {
		top: props.topY,
		width: props.windowWidth + "%",
		height: props.windowHeight,
		transform: props.isMirrorMode ? "scale(-1,1)" : "",
		backgroundColor: props.isDarkMode ? "black" : "white",
		color: props.isDarkMode ? "white" : "black",
		fontSize: props.fontSize * (props.fullScreen ? 2 : 1),
		fontWeight: props.fullScreen ? "600" : "100",
		textAlign: props.isJustifyText ? "justify" : "",
		lineHeight: props.fontSize * (props.fullScreen ? 2 : 1) * 1.7 + "px",
		letterSpacing: props.fullScreen ? "2px" : "0",
	},
}))`
	z-index: 1;
	position: relative;
	outline: none;
	border: none;
	resize: none;
	overflow: hidden;
	pointer-events: none;

	font-family: Google Sans;
	text-justify: inter-w;

	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;

	cursor: default;
	-webkit-user-select: none;
	-webkit-touch-callout: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;

	&:hover {
		outline: none;
	}
`;

// const PreviewPane = styled.textarea`
//   position: relative;
//   top: ${(props) => props.topY + "px"};
//   width: ${(props) => props.windowWidth + "%"};
//   height: ${(props) => props.windowHeight + "px"};
//   background-color: ${(props) => (props.isDarkMode ? "black" : "white")};
//   color: ${(props) => (props.isDarkMode ? "white" : "black")};
//   font-size: ${(props) =>
//     props.fontSize * (props.fullScreen === true ? 2 : 1) + "px"};
//   ${(props) => (props.isMirrorMode ? "transform: scale(-1, 1)" : "")};
//   text-align: ${(props) => (props.isJustifyText ? "justify" : "")};
//   text-justify: inter-w;

//   font-family: Google Sans;

//   border: none;
//   overflow: hidden;
//   outline: none;
//   -webkit-box-shadow: none;
//   -moz-box-shadow: none;
//   box-shadow: none;
//   resize: none;

//   cursor: default;
//   -webkit-user-select: none;
//   -webkit-touch-callout: none;
//   -khtml-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   -o-user-select: none;
//   pointer-events: none;

//   &:hover {
//     outline: none;
//   }
// `;

const PreviewPage = ({
	setFullScreen,
	fullScreen,
	content,
	setPreviewContent,
	fontSize,
	windowWidth,
	isMirrorMode,
	isDarkMode,
	isJustifyText,
}) => {
	const [windowHeight, setWindowHeight] = useState(100);
	const [scrollStarted, setScrollStarted] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [topY, setTopY] = useState(0);
	const [orientation, setOrientation] = useState(1);

	const UpDown = useRef();
	const ResumePause = useRef();
	const textPreviewPane = useRef();
	const pos = useRef(0);
	const pause = useRef(true);
	const interval = useRef(0);
	const keyMap = useMemo(
		() => ({
			KEY_ESC: 27,
			KEY_ARROW_UP: 38,
			KEY_ARROW_DOWN: 40,
			KEY_SPACE: 32,
			KEY_0: 48,
			KEY_9: 57,
			KEY_Q: 81,
			KEY_HOME: 36,
			KEY_END: 35,
		}),
		[]
	);

	const keyFunction = useCallback((event) => {
		const { key, keyCode } = event;

		if (fullScreen === false) return;
		switch (keyCode) {
			case keyMap.KEY_ESC:
				resetAll();
				break;
			case keyMap.KEY_ARROW_UP:
				resetSpeed(+1);
				break;
			case keyMap.KEY_ARROW_DOWN:
				resetSpeed(-1);
				break;
			case keyMap.KEY_SPACE:
				pause.current = !pause.current;
				break;
			case keyMap.KEY_Q:
				setOrientation((prev) => -prev);
				break;
			case keyMap.KEY_HOME:
				setOrientation(1);
				pause.current = true;
				pos.current = 0;
				textPreviewPane.current.scrollTop = pos.current;
				break;
			case keyMap.KEY_END:
				setOrientation(-1);
				pause.current = true;
				pos.current =
					textPreviewPane.current.scrollHeight -
					textPreviewPane.current.clientHeight;
				textPreviewPane.current.scrollTop = pos.current;
				break;
		}
		if (keyCode >= keyMap.KEY_0 && keyCode <= keyMap.KEY_9)
			setSpeed(keyCode - 48);
	});

	useEffect(() => {
		interval.current = setInterval(timerFunction, 40);
		document.addEventListener("keydown", keyFunction);
		return () => {
			clearInterval(interval.current);
			document.removeEventListener("keydown", keyFunction);
		};
	});

	useEffect(() => {
		if (fullScreen === false) {
			textPreviewPane.current.style.height = "100%";
		} else {
			// content = "";
			pos.current = 0;
			textPreviewPane.current.style.height = "90%";
			// setWindowHeight((prev) => textPreviewPane.current.scrollHeight);
		}
	}, [fullScreen]);

	const timerFunction = () => {
		if (pause.current === true) {
			ResumePause.current.textContent = "pause";
			return;
		}
		ResumePause.current.textContent = "play_arrow";

		pos.current = pos.current + speed * orientation;
		if (pos.current < 0) {
			setOrientation(1);
			pos.current = 0;
			pause.current = true;
		} else if (
			pos.current + textPreviewPane.current.clientHeight >
			textPreviewPane.current.scrollHeight
		) {
			setOrientation(-1);
			pos.current =
				textPreviewPane.current.scrollHeight -
				textPreviewPane.current.clientHeight;
			pause.current = true;
		}
		textPreviewPane.current.scrollTop = pos.current;
		//textPreviewPane.current.animate({ scrollTop: pos.current }, 40);
		//setTopY(-pos.current);
	};

	const resetAll = () => {
		const removeLineCount = parseInt(window.innerHeight / (fontSize * 6.8));
		let updatedContent = content;
		updatedContent = updatedContent.substr(removeLineCount);
		updatedContent = updatedContent.slice(0, -removeLineCount);
		setPreviewContent((prev) => updatedContent);
		setFullScreen(false);
		setSpeed(3);
		setTopY(0);
		setOrientation(1);
		pause.current = true;
		textPreviewPane.current.scrollTop = 0;
	};
	const resetSpeed = (indent) => {
		const updatedSpeed = speed + indent;
		if (updatedSpeed < 0 || updatedSpeed > 10) return;
		setSpeed(updatedSpeed);
	};
	// const resetInterval = () => {
	// 	if (interval.current !== 0) clearInterval(interval.current);
	// 	interval.current = setInterval(timerFunction, 40);
	// };

	return (
		<PageContainer isDarkMode={isDarkMode}>
			<ControlPanel fullScreen={fullScreen}>
				<State>
					<StateSpan>Direction</StateSpan>
					<StateIcon className="material-icons">{orientation == 1 ? "arrow_downward" : "arrow_upward"}</StateIcon>
				</State>
				<State>
					<StateSpan>Play/Resume</StateSpan>
					<StateIcon className="material-icons" ref={ResumePause}></StateIcon>
				</State>
				<div style={{ flex: 2 }} />
				<ScrollSpeedSlider
					min={0}
					max={10}
					onChange={(e) => setSpeed(e)}
					value={speed}
					marks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
				/>
				<div style={{ flex: 2 }} />
			</ControlPanel>
			<PreviewPane
				ref={textPreviewPane}
				spellCheck={false}
				isMirrorMode={isMirrorMode}
				isDarkMode={isDarkMode}
				isJustifyText={isJustifyText}
				fullScreen={fullScreen}
				fontSize={fontSize}
				windowWidth={windowWidth}
				windowHeight={windowHeight}
				value={content}
				topY={topY}
			/>
		</PageContainer>
	);
};

PreviewPage.propTypes = {
	fullScreen: propTypes.bool,
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
