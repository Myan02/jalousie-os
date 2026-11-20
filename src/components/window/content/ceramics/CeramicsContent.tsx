import PhotoCarousel from "../../helpers/PhotoCarousel";

const CeramicsContent = () => {
    const img_base = "/src/assets/content/ceramics/"
    const image_modules = import.meta.glob(`/src/assets/content/ceramics/*`, { eager: true, import: "default" });

    const displayMedia = Object.values(image_modules).map(((imgUrl, index) => {
        const file = String(imgUrl).split('/').pop()?.replaceAll("%20", " ");

        const fileName = file?.replace(/\.[^/.]+$/, "");
        const extension = file?.replace(String(fileName), "")

        return {
            id: index, src: `${img_base}${fileName}${extension}`, extension: extension, description: fileName
        }
    }));

    return (
        <PhotoCarousel windowId="ceramicsWindow" media={displayMedia} />
    );
};

export default CeramicsContent;