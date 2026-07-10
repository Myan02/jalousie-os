import "./Sections.css";

const Background = () => {
    return (
        <>
            <span className="Section__Title">About Me and Background</span>

            <span className="Section__Description">
                Hello! My name is Michael, I love to make things for people to interact with, experience, and enjoy.
                I have many hobbies — too many to count — and I want to share them with the world. This site is exactly that, a fun way to get inspired
                by seeing my awfully messy journey of learning and failing over the last 10 years.

                <br /><br />

                I began working on this website senior year of my undergraduate studies. React JS was (and still is) a popular javascript library and I thought it would
                be useful to learn. At the same time, I came across a YouTube video by a creator named <a title="meow" href="https://www.youtube.com/@shar" target="_blank">@shar</a>, who showcased
                their personal website (check it out at <a href="https://www.sharyap.com/" target="_blank">www.sharyap.com</a>, it's realy cool).

                <br /><br />

                I loved the draggable windows, sound effects, and animations.I was inspired to learn how she did it and make something of my own.
                After over a year of development, Jalousie OS was born! It's just Windows98 but don't tell Microsoft...
            </span>
        </>
    );
};

export default Background;