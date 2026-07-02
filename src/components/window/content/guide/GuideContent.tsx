import WindowTab from "../../WindowTab";
import "./GuideContent.css";

const GuideContent = () => (
    <div className="guide">
        <div className="guide__header">
            <WindowTab label="Hide" imageSrc="hide-icon.png" click={() => console.log("clicked")} />
            <WindowTab label="Back" imageSrc="left-arrow-icon.png" click={() => console.log("clicked")} />
            <WindowTab label="Forward" imageSrc="right-arrow-icon.png" click={() => console.log("clicked")} />
            <WindowTab label="Options" imageSrc="options-icon.png" click={() => console.log("clicked")} />
            <WindowTab label="Web Help" imageSrc="web-help-icon.png" click={() => console.log("clicked")} />
        </div>

        <div className="guide__body">
            <div className="guide__body-table">
                <p>this is the table</p>
            </div>

            <div className="guide__body-content">
                <p>This is the content Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure atque recusandae praesentium quisquam perspiciatis, dicta ut quibusdam nulla nihil fugit ab debitis veniam ex eaque saepe quasi doloribus reprehenderit sed? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut maxime dolores placeat optio, animi, explicabo minima inventore, nostrum impedit iusto sapiente voluptatem rerum. Ex, qui magnam iste vitae sunt a! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nulla, perferendis voluptatibus quae voluptatum qui adipisci alias eius quidem delectus ipsa distinctio iure non consectetur quasi inventore consequuntur culpa enim. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, eos? Nesciunt provident molestias quidem doloribus quam sint cumque vitae! Illo magni consectetur perferendis adipisci excepturi earum laborum ipsam quasi totam.</p>
            </div>
        </div>
    </div>
);
export default GuideContent;