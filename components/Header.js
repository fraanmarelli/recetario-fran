import Link from "next/link";
import { createClient } from "contentful";


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

const Navbar = ({recipes}) => {
  return (
    <>
      <div className="navbar-container">
        <div className="logo">EL RECETARIO DE <span>FRANCO MARELLI</span></div>
        <div className="links-container">
          <div className="nav-link">
            <Link href={`/`}>HOME</Link>
          </div>
          <div className="nav-link dropdown">
            <div className="dropbtn">TIPOS DE RECETAS</div>
            <div className="dropdown-content">
              <Link href={`/recipes/type/`}>
                <a>Salsas</a>
              </Link>
              <Link href={`/recipes/type/${type[2]}`}>
                <a>Sopas</a>
              </Link>
              <Link href={`/`}>
                <a>Dulce</a>
              </Link>
              <Link href={`/`}>
                <a>Salado</a>
              </Link>
            </div>
          </div>
          <div className="nav-link">
            <Link href={`/hello`}>RANDOMS</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .navbar-container {
          display: flex;
          justify-content: space-between;
          background-color: white;
          padding: 10px;
          width: 100%;
          position: fixed;
          z-index: 1;
        }
        .links-container {
          display: flex;
        }
        .nav-link {
          margin-left: 15px;
          color: black;
          text-decoration: none;
        }
        .nav-link:hover {
          background-color: #f3e9a6;
          padding-left: 15px;
          padding-right: 15px;
        }
        .dropdown:hover .dropdown-content {
          display: block;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
        .dropdown-content a {
          color: black;
          padding: 5px;
          text-decoration: none;
          display: block;
          text-align: left;
          font-size: 0.7em;
        }
        .dropdown-content a:hover {
          background-color: #f3e9a6;
        }
        span {
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

const Header = () => {
  return (
    <>
      <Navbar/>
      <header>
        <Link passHref href="/">
          <div className="title">
            <h1>
              <a>
                <span>EL RECETARIO DE</span> FRANCO MARELLI
              </a>
            </h1>
            {/* <p>facil y rapido!</p> */}
          </div>
        </Link>
        <style jsx>
          {`
            a {
              text-decoration: none;
            }
            h1 {
              margin: 7px;
            }
            p {
              margin: 0px;
              font-size: 0.6em;
              font-weight: 800;
            }
            span {
              font-weight: 400;
            }
            .title {
              margin-top: 40px;
              margin-bottom: 25px;
            }
          `}
        </style>
      </header>
    </>
  );
};

export default Header;
