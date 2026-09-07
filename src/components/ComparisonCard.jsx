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
                    <div className="d-flex justify-content-between mb-3">
                        <h4 className="card-title">{product.title}</h4>
                        <div className="col-6 text-end">
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
            <div className="card h-100" style={{ "border": "dashed" }}>
                <p> Select a product</p>
            </div>
        </div>
};

export default ComparisonCard;