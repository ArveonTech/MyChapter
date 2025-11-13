import { Contact } from "lucide-react";

const ContactComponent = () => {
  return (
    <div className="mt-10 sm:mt-20 md:mt-30" id="contact" data-aos="fade-up" data-aos-duration="1300">
      <div className="flex justify-center items-center gap-5">
        <h1 className="text-lg sm:text-2xl font-semibold">Contact Me</h1>
        <Contact strokeWidth={2.5} size={28} />
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <a href="https://github.com/ArveonTech">
          <img src="/images/icons/github.png" alt="github-image" className="w-10 md:w-14" />
        </a>
        <a href="https://www.linkedin.com/in/ahdarizqi/">
          <img src="/images/icons/linkedin.png" alt="github-image" className="w-10 md:w-14" />
        </a>
        <a href="https://www.instagram.com/4hdarizq1/">
          <img src="/images/icons/instagram.png" alt="github-image" className="w-10 md:w-14" />
        </a>
      </div>
    </div>
  );
};

export default ContactComponent;
