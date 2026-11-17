import PhotoCarousel from "../../helpers/PhotoCarousel";

const CDPlayerContent = () => {
    const img_base = "/assets/content/cd-player/"
    const image_modules = import.meta.glob(`/assets/content/cd-player/*`, { eager: true });

    const displayMedia = Object.entries(image_modules).map(([path], index) => {
        const file = path.split('/').pop();

        const fileName = file?.replace(/\.[^/.]+$/, "");
        const extension = file?.replace(String(fileName), "")

        return {
            id: index, src: `${img_base}${fileName}${extension}`, extension: extension, description: fileName
        }
    })

    return (
        <PhotoCarousel windowId="cdPlayerWindow" media={displayMedia} />
    );
};

export default CDPlayerContent;