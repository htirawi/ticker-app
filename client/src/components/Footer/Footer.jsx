const Footer = () => {
  return (
    <footer className="bg-white shadow-md py-4 px-8 fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center">
      <p className="font-normal text-center text-[14px] leading-[16px] mb-3 md:mb-0 text-green-600">
        &copy; 2024 Ticker. All rights reserved.
      </p>

      <p className="font-normal text-center text-[14px] leading-[16px] text-green-600">
        Coded by <strong>Hussein Tirawi</strong>
      </p>
      <div className="flex space-x-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={"https://jo.opensooq.com/en"}
          className=" hover:text-blue-600 transition duration-200 text-green-600"
        >
          Visit OpenSooq
        </a>
      </div>
    </footer>
  );
};

export default Footer;
