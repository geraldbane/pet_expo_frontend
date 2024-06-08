
const Footer = () => {
  return (
    <footer className="bg-navbarColor text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div id="about" className="w-full lg:w-3/5 mb-8 lg:mb-0">
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            Ne jemi destinacioni juaj i duhur për të gjitha nevojat e kafshëve tuaja shtëpiake,
            informacione të rëndësishme për kujdesin e tyre dhe marrëdhënien tuaj
            me to. Në faqen tonë, do të gjeni një gamë të gjerë të kafshëve
            shtëpiake.
          </p>
        </div>
        <div id="contact" className="w-full lg:w-2/5">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <address className="text-sm">
            <p>Rruga: Mine Peza</p>
            <p>Email: <a href="mailto:">info@pet_expo.com</a> </p>
            <p>Phone: <a href="tel:">123-456-7890</a> </p>
          </address>
          <p>Tiranë, Shqipëri</p>
        </div>
      </div>
      <div className="container mx-auto text-center mt-4">
        <p className="flex items-center justify-center">
          <span className="mr-2"><i>  2024  &copy; Pet Expo</i></span>
        
        </p>
      </div>
    </footer>
  );
};

export default Footer;
