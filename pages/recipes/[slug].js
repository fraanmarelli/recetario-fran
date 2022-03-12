import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_API_KEY,
});

//getStaticPaths sirve para crear un path para cada pagina dinamica especifica
export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

//getStaticProps sirve para traer la info al path dinamico que generamos en getStaticPaths
export const getStaticProps = async ({ params }) => {
  const res = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  return {
    props: { recipe: res.items[0] },
  };
};

const RecipeInfo = ({ recipe }) => {
  console.log(recipe);

  const {
    cookingTime,
    title,
    featuredImage,
    difficulty,
    ingredients,
    cookingMethod,
  } = recipe.fields;

  return (
    <>
      <div className="featuredImage">
        <div>
          <Image
            src={`http:${featuredImage.fields.file.url}`}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
            alt=""
          />
        </div>
      </div>
      <div className="foodHeader">
        <h2 className="title">{title}</h2>
        <div className="paralellogram-box">
          <p>
            <span>Necesitas aprox</span> {cookingTime} minutos
          </p>
        </div>
        <div className="paralellogram-box">
          <p>
            <span>Dificultad:</span> {difficulty}
          </p>
        </div>
      </div>
      <div className="recipe-body">
        <div className="ingredients-box">
          <h4>Ingredientes: </h4>
          {ingredients.map((ing) => (
            <p key={ing}>{ing}</p>
          ))}
        </div>
        <div className="method">
          <h3>Receta:</h3>
          <div>{documentToReactComponents(cookingMethod)}</div>
        </div>
      </div>
      <style jsx>
        {`
          .featuredImage > div {
            display: flex;
            justify-content: center;
          }
          .foodHeader {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
          }
          .title {
            flex-basis: 100%;
            display: flex;
            justify-content: center;
          }
          .paralellogram-box {
            background: #fff;
            transform: skew(-10deg);
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 0px 15px 0px 15px;
          }
          span {
            font-weight: bold;
          }
          .recipe-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .ingredients-box {
            background-color: #fff;
            padding: 0px 145px 15px 145px;
            margin-top: 60px;
            border-radius: 3px;
            text-align: center;
          }
          h4 {
            margin-top: 20px;
            margin-bottom: 5px;
          }
          p {
          }
        `}
      </style>
    </>
  );
};

export default RecipeInfo;

/*           .page{
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          // .recipe-body {
          //   display: flex;
          //   align-items: center;
          //   background: #fac38b;
          //   margin: 15px;
          //   max-width: 60%;
          // }
          // h2 {
          //   text-align: center;
          //   background: #fac38b;
          //   transform: rotateZ(-0.5deg);
          //   margin: 5px 10px 20 10px;
          //   top: -70px;
          //   left: -20px;
          //   color: #fff;
          // }
          // .ingredientsh4 {
          //   transform: rotateZ(+1deg);
          //   background: #fff;
          //   margin: 0;
          //   position: relative;
          //   left: -20px;
          //   top: -25px;
          //   padding: 15px;
          //   text-align: center;
          // }
          .medium-tag {

          }
          .full-width {
            flex-basis: 100%
          }

          */
