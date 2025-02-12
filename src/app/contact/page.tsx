import SimpleTooltip from "@/components/common/SimpleTooltip";
import AuthorRequestForm from "@/components/pages/contact/AuthorRequestForm";
import ContactForm from "@/components/pages/contact/ContactForm";
import SocialsSection from "@/components/pages/contact/SocialsSection";
import { H2, H3 } from "@/components/text/heading";
import { MessageCircleQuestionIcon } from "lucide-react";
import { FcQuestions } from "react-icons/fc";

export default function ContactPage() {
  return (
    <main className="w-full bg-cGray-dark">
    <div className="container w-full md:w-[80%] mx-auto px-4 py-8">
      <H2 className="mb-8 text-center text-white">Contact Me</H2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">
        <div className="p-10 border-4 border-black bg-white">
          <SimpleTooltip content="Tell us what you think about this site">
            <H3 className="mb-4 text-gray-800">
              Got any Feedback for Us?{" "}
              <span className="inline-flex ml-2 cursor-pointer hover:scale-110 transition-all duration-300">
                <MessageCircleQuestionIcon />
              </span>
            </H3>
          </SimpleTooltip>
          <ContactForm />
        </div>

        <div className="p-10 border-4 border-black bg-white">
        <SimpleTooltip content="Authors can publish their blogs on this site">
            <H3 className="mb-4 text-gray-800">
              Wanna Become an Author?{" "}
              <span className="inline-flex ml-2 cursor-pointer hover:scale-110 transition-all duration-300">
                <MessageCircleQuestionIcon />
              </span>
            </H3>
          </SimpleTooltip>
          <AuthorRequestForm />
        </div>
      </div>
      <div className=" mt-12">
        <H3 className="mb-4 text-white">Connect with Me</H3>
        <SocialsSection />
      </div>
    </div>
    </main>
  );
}
