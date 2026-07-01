import { DragProvider, useDragContext } from './context/DragContext';
import Desktop from './components/desktop/Desktop';
import Window from './components/window/Window';
import Taskbar from './components/taskbar/Taskbar';
import './index.css';

const WindowLayer = () => {
  const { windows } = useDragContext();
  return (
    <>
      {windows.map((win) => <Window key={win.id} window={win} />)}
    </>
  );
};

function App() {
  return (
    <DragProvider>
      <Desktop />
      <WindowLayer />
      <Taskbar />
    </DragProvider>
  );
};

export default App;
