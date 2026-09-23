import "./Sections.css";

const Questions = () => {
    return (
        <>
            <span style={{ marginBottom: "16px" }} className="Section__Title">Infrequently Asked Questions</span>

            <ol className="Section__List">
                <li className="Section__List-Item"><i>How did you make this?</i></li>
                <span className="Section__Description">
                    I only used the Javascript library React with Typescript as the main language.
                    No extra packages, modules, or libraries.
                </span>

                <li style={{ marginTop: "8px" }} className="Section__List-Item"><i>Why Windows 98?</i></li>
                <span className="Section__Description">
                    I grew up with an old Windows XP. Old timey Windows operating systems hold a special place
                    in my heart. I love the feel of Windows 98; back when people had a passion for creating.
                </span>

                <li style={{ marginTop: "8px" }} className="Section__List-Item"><i>I'm looking at your source code, why do you have so many comments?</i></li>
                <span className="Section__Description">
                    I wrote a bunch of comments since they help me remember the choices I make years down the line.
                    Also it might be helpful for people trying to figure out my sweaty code. Don't do this in production lol.
                </span>


                <li style={{ marginTop: "8px" }} className="Section__List-Item"><i>Where did you get these epic graphics?</i></li>
                <span className="Section__Description">
                    I either found the icon in an online Win98 emulator,
                    an online repository of Win98 icons (shoutout Alex Meub for this amazing resource),
                    or drew the pixel art myself! More on the credit for these sources in the next section.
                </span>
            </ol>
        </>
    );
};

export default Questions;