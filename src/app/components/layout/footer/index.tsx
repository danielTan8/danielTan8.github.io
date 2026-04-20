import Logo from "../logo";

const Footer = () => {
  return (
    <footer className="pb-10 pt-20">
      <div className="container">
        <div className="flex flex-col gap-8">
          <div className="relative flex items-center w-full">
            <div className="flex-grow h-px bg-gray-300" />
            <div className="mx-4">
              <Logo />
            </div>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
            <p className="text-gray-500 text-sm md:text-base">
              Designed by{" "}
              <span className="text-orange-500 font-medium">Daniel Tan</span>
              {" • "}
              Distributed by{" "}
              <span className="text-orange-500 font-medium">Daniel Tan</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
