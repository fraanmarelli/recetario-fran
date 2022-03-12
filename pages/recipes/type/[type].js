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
        type: item.fields.typeOfFood,
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
    "fields.typeOfFood": params.type,
  });

  return {
    props: { recipe: res.items[0] },
  };
};

const RecipeInfo = ({ recipe }) => {

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
        <div>hola</div>
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