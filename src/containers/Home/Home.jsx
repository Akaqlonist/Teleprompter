import React, { useState } from "react";
import styled from "styled-components";

import Preview from "./Preview";
import Settings from "./Settings";

const MainPage = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: row;
`;

const _previewContent =
	"Keyboard Shortcuts:\n\nSPACE:    Resume / Stop\nUP / DOWN:     Speed up / down\nNum 0-9:    Set Speed\nQ:     Invert Direction\nHOME:      Scroll to top\nEND:      Scroll to bottom\nESC:    Quit\n\nYour browser works like a teleprompter -no extra software needed. Free for any use (both commercial and non-commercial) Bookmark this site and come again whenever you need teleprompter services.Your browser works like a teleprompter -no extra software needed. Free for any use (both commercial and non-commercial) Bookmark this site and come again whenever you need teleprompter services.Your browser works like a teleprompter -no extra software needed. Free for any use (both commercial and non-commercial) Bookmark this site and come again whenever you need teleprompter services.Your browser works like a teleprompter -no extra software needed. Free for any use (both commercial and non-commercial) Bookmark this site and come again whenever you need teleprompter services.";

const HomeContainer = ({}) => {
	const [previewContent, setPreviewContent] = useState(_previewContent);
	const [isJustifyText, setJustifyText] = useState(false);
	const [fontSize, setFontSize] = useState(20);
	const [windowWidth, setWindowWidth] = useState(85);
	const [isDarkMode, setDarkMode] = useState(true);
	const [isMirrorMode, setMirrorMode] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);

	return (
		<MainPage>
			{!fullScreen && (
				<Settings
					fontSize={fontSize}
					windowWidth={windowWidth}
					isMirrorMode={isMirrorMode}
					isDarkMode={isDarkMode}
					isJustifyText={isJustifyText}
					setFullScreen={setFullScreen}
					previewContent={previewContent}
					setPreviewContent={setPreviewContent}
					setFontSize={setFontSize}
					setWindowWidth={setWindowWidth}
					setDarkMode={setDarkMode}
					isDarkMode={isDarkMode}
					setMirrorMode={setMirrorMode}
					setJustifyText={setJustifyText}
				/>
			)}
			<Preview
				setFullScreen={setFullScreen}
				fullScreen={fullScreen}
				isJustifyText={isJustifyText}
				isDarkMode={isDarkMode}
				isMirrorMode={isMirrorMode}
				windowWidth={windowWidth}
				content={previewContent}
				setPreviewContent={setPreviewContent}
				fontSize={fontSize}
			/>
		</MainPage>
	);
};
export default HomeContainer;
