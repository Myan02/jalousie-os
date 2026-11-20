import PhotoCarousel from "../../helpers/PhotoCarousel";

const SubwayFilesContent = () => {
    const image_modules = import.meta.glob(`/src/assets/content/models/*`, { eager: true, import: "default" });

    const displayMedia = Object.entries(image_modules).map(([rawPath, imgUrl], index) => {
        const file = rawPath.split('/').pop();

        const fileName = file?.replace(/\.[^/.]+$/, "");
        const extension = file?.replace(String(fileName), "")

        return {
            id: index, src: String(imgUrl), extension: extension, description: fileName
        }
    });

    return (
        <PhotoCarousel windowId="subwayFilesContent" media={displayMedia} />
    );
};

export default SubwayFilesContent;