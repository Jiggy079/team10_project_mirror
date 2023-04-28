export default function ImgWithLink({figures, id, user}) {

	return (
        <a href={`/annotation?user=${user}&image=${id}`} target="_blank" rel="noopener noreferrer">
            <img
                className="imgwithlinks"
                src={figures[id-1]["url"]}
                alt={figures[id-1]["name"]}
                loading="lazy"
            />
        </a>
	);
}