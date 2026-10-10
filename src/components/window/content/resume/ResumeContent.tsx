import "../../../../assets/documents/resume_michael_baburyan.pdf";

const ResumeContent = () => {
    return (
        <div style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
            <object
                data="src/assets/documents/resume_michael_baburyan.pdf"
                type="application/pdf"
                width={"100%"}
                height={"100%"}
                style={{ border: "none" }}
            >
                <a href="src/assets/documents/resume_michael_baburyan.pdf" target="_blank">Download my resume!</a>
            </object>
        </div>
    );
};

export default ResumeContent;