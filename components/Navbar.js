import Link from 'next/link'

const Navbar = () => {
  return (
    <>
      <div className="navbar-container">
        <div>HOME</div>
        <div>TIPO DE RECETAS</div>
        <div>RANDOMS</div>
      </div>
      <style jsx>{`
        .navbar-container {
            display: flex;
            justify-content: flex-end;
            color: black;
        }
      `}</style>
    </>
  );
};

export default Navbar;
