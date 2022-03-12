import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_API_KEY,
  });

  const response = await client.getEntries({
    content_type: "recipe",
  });
  
  return {
    props: {
      recipes: response.items,
    },
  };
};

const Home = ({ recipes }) => {
  return (
    <>
      <div>
        <h3>ULTIMAS NOVEDADES.. </h3>
      </div>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))}
        <style jsx>
          {`
            .recipe-grid {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-gap: 25px 25px;
              margin-left: 15px;
              margin-right: 15px;
              justify-items: center;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Home;
