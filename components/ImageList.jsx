import Image from './Image';

function ImageList({ images, loading, onRemove, removable, isPreview }) {
  return (
    <div className="flex flex-wrap gap-2 my-8">
      {images?.map((file, index) => (
        <Image
          key={file}
          src={file}
          alt="image"
          loading={loading && index === images.length - 1}
          onRemove={onRemove}
          removable={removable}
          isPreview={isPreview}
          index={index}
        />
      ))}
    </div>
  );
}

export default ImageList;
