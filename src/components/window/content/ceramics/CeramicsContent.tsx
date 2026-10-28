import PhotoCarousel from "../../helpers/PhotoCarousel";

const CeramicsContent = () => {

    const img_base = "/src/assets/content/ceramics/"
    const image_modules = import.meta.glob(`/src/assets/content/ceramics/*.jpg`, { eager: true });

    const displayImages = Object.entries(image_modules).map(([path], index) => {
        const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, "");

        return {
            id: index, src: `${img_base}${fileName}.jpg`, description: fileName
        }
    })

    return (
        <>
            <PhotoCarousel windowId="ceramicsWindow" images={displayImages} />
        </>
    );
};

export default CeramicsContent;