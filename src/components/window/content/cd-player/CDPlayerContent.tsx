import PhotoCarousel from "../../helpers/PhotoCarousel";

const CDPlayerContent = () => {
    const img_base = "/src/assets/content/cd-player/"
    const image_modules = import.meta.glob(`/src/assets/content/cd-player/*`, { eager: true, import: "default" });

    const displayMedia = Object.values(image_modules).map(((imgUrl, index) => {
        const file = String(imgUrl).split('/').pop()?.replaceAll("%20", " ");

        const fileName = file?.replace(/\.[^/.]+$/, "");
        const extension = file?.replace(String(fileName), "")

        return {
            id: index, src: `${img_base}${fileName}${extension}`, extension: extension, description: fileName
        }
    }));

    return (
        <PhotoCarousel windowId="cdPlayerWindow" media={displayMedia} />
    );
};

export default CDPlayerContent;