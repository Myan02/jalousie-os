import PhotoCarousel from "../../helpers/PhotoCarousel";

const CeramicsContent = () => {
    const img_base = "/assets/content/ceramics/"
    const image_modules = import.meta.glob(`/assets/content/ceramics/*`, { eager: true });

    const displayMedia = Object.entries(image_modules).map(([path], index) => {
        const file = path.split('/').pop();

        const fileName = file?.replace(/\.[^/.]+$/, "");
        const extension = file?.replace(String(fileName), "")

        return {
            id: index, src: `${img_base}${fileName}${extension}`, extension: extension, description: fileName
        }
    })

    return (
        <PhotoCarousel windowId="ceramicsWindow" media={displayMedia} />
    );
};

export default CeramicsContent;