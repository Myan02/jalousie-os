import PhotoCarousel from "../../helpers/PhotoCarousel";

const CeramicsContent = () => {
    const image_modules = import.meta.glob(`/src/assets/content/ceramics/*`, { eager: true, import: "default" });

    const displayMedia = Object.entries(image_modules).map(([rawPath, imgUrl], index) => {
        const file = rawPath.split('/').pop();

        const fileName = file?.replace(/\.[^/.]+$/, "");
        const extension = file?.replace(String(fileName), "")

        return {
            id: index, src: String(imgUrl), extension: extension, description: fileName
        }
    });

    return (
        <PhotoCarousel windowId="ceramicsWindow" media={displayMedia} />
    );
};

export default CeramicsContent;