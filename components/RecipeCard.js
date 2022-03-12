import Link from "next/link";
import Image from "next/image";

const elaboratedCookingTime = (time) => {
  if (time > 120 && time % 60 != 0) {
    const minutes = time % 60;
    const hours = time / 60;
    return ` ${Math.round(hours)} horas y ${minutes} minutos`;
  } else if (time > 120) {
    const hours = time / 60;
    return hours + " horas";
  } else {
    return time + " minutos";
  }
};

const RecipeCard = ({ recipe }) => {
  const { slug, title, featuredImage, cookingTime, difficulty, ingredients } =
    recipe.fields;

  return (
    <div className="card">
      <div className="featuredImage">
        <Image
          src={`http:${recipe.fields.featuredImage.fields.file.url}`}
          width={499}
          height={340}
          alt=""
        />
      </div>
      <div className="content">
        <div className="info">
          <h5>{recipe.fields.title}</h5>
          <p>Necesitas aproximadamente {elaboratedCookingTime(cookingTime)}</p>
        </div>
        <div className="actions">
          <Link href={`/recipes/${slug}`}>
            <a>Cociname!</a>
          </Link>
        </div>

        <style jsx>
          {`
            .content {
              background: #fff;
              transform: rotateZ(-1deg);
              position: relative;
              margin: 5px 15px 0 15px;
              top: -70px;
              left: -20px;
              max-width: 470px;
              box-shadow: 2px 2px 30px #fac38b;
            }
            .info p {
              margin: 5px;
            }
            .info h5 {
              margin: 10px;
            }
            .actions {
              margin-top: 20px;
              display: flex;
              justify-content: flex-end;
            }
            .actions a {
              background: #f3e9a6;
              padding: 1% 3%;
              text-decoration: none;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default RecipeCard;
