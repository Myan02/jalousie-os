import { useEffect, useState } from "react";
import { useDragContext } from "../../context/DragContext";
import Dropdown from "../window/helpers/Dropdown";
import startupSound from "../../assets/audio/startup-sound.mp3"
import "./Taskbar.css";

const Taskbar = () => {
    const { windows, focusWindow } = useDragContext();
    const [volumeWindow, setVolumeWindow] = useState<boolean>(false);
    const [time, setTime] = useState(new Date());

    const startupSoundObject = new Audio(startupSound);
    startupSoundObject.volume = 0.25;

    useEffect(() => {
        startupSoundObject.play();
        const interval = setInterval(() => setTime(new Date()), 1000);

        const handleOuterClick = (e: PointerEvent) => {
            const target = e.target as HTMLButtonElement;

            if (target?.closest('div')?.className === "Dropdown" ||
                target?.closest('button')?.className === "taskbar__volume") {
                setVolumeWindow(true);
                return;
            } else {
                setVolumeWindow(false);
            }
        };

        document.addEventListener("click", handleOuterClick);

        return () => {
            clearInterval(interval);
            document.removeEventListener("click", handleOuterClick);
        };
    }, []);

    return (
        <div className="taskbar">

            <button className="taskbar__start-btn">
                <img className="taskbar__start-icon" src="./src/assets/icons/start-icon.png" alt="Start" />
                <span>Start</span>
            </button>

            <div className="taskbar__divider" />

            <div className="taskbar__windows">
                {windows.map((win) => (
                    <button
                        key={win.id}
                        className={`taskbar__window-btn ${win.minimized ? "taskbar__window-btn--minimized" : ""}`}
                        onClick={() => focusWindow(win.id)}
                    >
                        <img className="taskbar__window-icon" src={`./src/assets/icons/${win.windowSrc}`} alt={win.title} />
                        <span>{win.title}</span>
                    </button>
                ))}
            </div>

            <div className="taskbar__divider" />

            <div className="taskbar__tray">
                <button
                    className="taskbar__volume"
                >
                    <img className="taskbar__window-icon" src="./src/assets/icons/loudspeaker-icon.png" alt="volume button" />
                    {volumeWindow &&
                        <Dropdown style={{
                            backgroundColor: "var(--win-silver)",
                            bottom: "0",
                            right: "100px",
                            width: "95px",
                            height: "150px",
                            justifyContent: "space-around"
                        }}>
                            <span style={{ fontWeight: "100", fontFamily: "MS Sans Serif" }}>Volume</span>
                            <span className="taskbar__volume-slider__container">
                                <input type="range" max={100} value={50} style={{}} className="taskbar__volume-slider" />
                            </span>
                            <span className="taskbar__volume-mute">
                                <input type="checkbox" />
                                <span style={{ fontWeight: "100", fontFamily: "MS Sans Serif" }}><u>M</u>ute</span>
                            </span>
                        </Dropdown>}
                </button>
                <span className="taskbar__clock">
                    {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
            </div>
        </div >
    );
};

export default Taskbar;