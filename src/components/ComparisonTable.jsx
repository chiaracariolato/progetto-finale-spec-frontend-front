import Rating from "./Rating"

export default function ComparisonTable({ productA, productB }) {

    return (
        <div className="table-responsive">
            <table className="table align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: "30%" }} />
                        <th scope="col fw-bolder">{productA.title}</th>
                        <th scope="col fw-bolder">{productB.title}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row fw-bolder">Category</th>
                        <td className="fw-lighter">{productA.category}</td>
                        <td>{productB.category}</td>
                    </tr>
                    <tr>
                        <th scope="row fw-bolder">Price</th>
                        <td>{productA.price} €</td>
                        <td>{productB.price} €</td>
                    </tr>
                    <tr>
                        <th scope="row fw-bolder">Players</th>
                        <td>{productA.minPlayers} - {productA.maxPlayers}</td>
                        <td>{productB.minPlayers} - {productB.maxPlayers}</td>
                    </tr>
                    <tr>
                        <th scope="row fw-bolder">Play time</th>
                        <td>{productA.playTime} min</td>
                        <td>{productB.playTime} min</td>
                    </tr>
                    <tr>
                        <th scope="row fw-bolder">Age</th>
                        <td>{productA.minAge}+</td>
                        <td>{productB.minAge}+</td>
                    </tr>
                    <tr>
                        <th scope="row fw-bolder">Publisher</th>
                        <td>{productA.publisher}</td>
                        <td>{productB.publisher}</td>
                    </tr>
                    <tr>
                        <th scope="row fw-bolder">Release year</th>
                        <td>{productA.releaseYear}</td>
                        <td>{productB.releaseYear}</td>
                    </tr>
                    <tr>
                        <th scope="row fw-bolder">Difficulty</th>
                        <td>{productA.difficulty}</td>
                        <td>{productB.difficulty}</td>
                    </tr>
                    <tr>
                        <th scope="row">Rating</th>
                        <td><Rating rating={productA.rating} /> / 5</td>
                        <td><Rating rating={productB.rating} /> / 5</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}