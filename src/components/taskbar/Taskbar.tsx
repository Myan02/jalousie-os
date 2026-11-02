import { useEffect, useState } from "react";
import { useDragContext } from "../../context/DragContext";
import startupSound from "../../assets/audio/startup-sound.mp3"
import "./Taskbar.css";

const Taskbar = () => {
    const { windows, focusWindow } = useDragContext();
    const [time, setTime] = useState(new Date());

    const startupSoundObject = new Audio(startupSound);
    startupSoundObject.volume = 0.25;

    useEffect(() => {
        startupSoundObject.play();
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
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
                <span className="taskbar__clock">
                    {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
            </div>
        </div>
    );
};

export default Taskbar;