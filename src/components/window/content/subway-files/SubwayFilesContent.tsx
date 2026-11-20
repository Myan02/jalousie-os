import PhotoCarousel from "../../helpers/PhotoCarousel";

const SubwayFilesContent = () => {
    const img_base = "/src/assets/content/models/"
    const image_modules = import.meta.glob(`/src/assets/content/models/*`, { eager: true, import: "default" });

    const displayMedia = Object.values(image_modules).map(((imgUrl, index) => {
        const file = String(imgUrl).split('/').pop()?.replaceAll("%20", " ");

        const fileName = file?.replace(/\.[^/.]+$/, "");
        const extension = file?.replace(String(fileName), "")

        return {
            id: index, src: `${img_base}${fileName}${extension}`, extension: extension, description: fileName
        }
    }));

    return (
        <PhotoCarousel windowId="subwayFilesContent" media={displayMedia} />
    );
};

export default SubwayFilesContent;