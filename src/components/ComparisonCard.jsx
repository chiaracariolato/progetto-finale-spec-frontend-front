import Rating from "../components/Rating";

const ComparisonCard = ({ product }) => {

    return product ? (

        <div className="col-md-6">
            < div className="card h-100" >
                <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top p-3 object-fit-contain"
                    style={{ height: "260px" }}
                />
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="card-title mb-0">
                            {product.title}
                        </h4>
                        <div className="text-end">
                            <Rating rating={product.rating} /> / 5
                        </div>
                    </div>
                    <p className="card-text text-secondary">{product.description}</p>
                    <p className="h5 mb-3">{product.price}€</p>
                </div>
            </div >
        </div >

    ) :
        <div className="col-md-6">
            <div className="card h-100 border border-secondary-subtle">
                <div
                    className="d-flex align-items-center justify-content-center text-secondary"
                    style={{ height: "100%" }}
                >
                    <p className="mb-0 py-5"> Select a product</p>
                </div>
            </div>
        </div>


};

export default ComparisonCard;