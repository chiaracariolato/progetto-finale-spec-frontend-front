
const Rating = ({ rating }) => {

    let fullStar = 0;
    let halfStar = 0;

    for (let count = 1; count <= 5; count++) {
        if (count < rating) {
            fullStar++;
        } else if (count === rating) {
            fullStar++
            break
        } else {
            halfStar++
            break
        }
    }

    const fullStarArray = Array.from({ length: fullStar });
    const halfStarArray = Array.from({ length: halfStar });
    const emptyStarArray = Array.from({ length: 5 - fullStar - halfStar });

    console.log("test")

    return (
        <>
            {
                fullStarArray.map((e, i) =>
                    <i key={i} className="bi bi-star-fill text-warning"></i>
                )
            }

            {
                halfStarArray.map((e, i) =>
                    <i key={i} className="bi bi-star-half text-warning"></i>
                )
            }
            {
                emptyStarArray.map((e, i) =>
                    <i key={i} className="bi bi-star text-warning"></i>
                )
            }
            <span className="ms-2 fs-5 fw-bolder">{rating}</span>
        </>
    )
}

export default Rating;