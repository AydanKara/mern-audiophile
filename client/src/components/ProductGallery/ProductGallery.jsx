import "./ProductGallery.css";

const ProductGallery = ({ product }) => {
  const galleryImages = product?.galleryImage || [];

  return (
    <ul id="product-gallery">
      <li className="first">
        <img src={galleryImages[0]} alt="First image from gallery" />
      </li>
      <li className="second">
        <img src={galleryImages[1]} alt="Second image from gallery" />
      </li>
      <li className="third">
        <img src={galleryImages[2]} alt="Third image from gallery" />
      </li>
    </ul>
  );
};

export default ProductGallery;
